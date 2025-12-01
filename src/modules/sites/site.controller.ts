import type { FastifyReply, FastifyRequest } from "fastify";
import type { CreateSiteDto } from "./site.schema.js";
import { siteSirvices, siteUserServices } from "./site.service.js";
import { AppError } from "../../utilities/appError.js";
import type { ISiteUsers } from "./site.model.js";
import { checkUserHasSite, urlValidation} from "./site.validation.js";
import { answer } from "../../utilities/returns.js";
import type { idParamsDto } from "../../utilities/public.schema.js";
import { userServices } from "../users/user.service.js";

export const createSite = async (req: FastifyRequest, reply: FastifyReply) => {
    const { url, title } = req.body as CreateSiteDto;
    const {user_id} = req.user;

    const user = await userServices.find(user_id);
    if (!user) throw new AppError('User not found', 404, 'NOT_FOUND');
    
    const urlValidateResult = await urlValidation(url);
    if (!urlValidateResult.ok) throw new AppError(`Url is not correct. ${urlValidateResult.error}`, 400, "INVALID_URL");

    const setTitle = title ?? url;
    const checkUserDuplicateTitle = await siteUserServices.findByUserAndTitle(user_id, setTitle);
    if (checkUserDuplicateTitle) throw new AppError("This title has already been used", 409, "DUPLICATE_TITLE");

    const site = (
        await siteSirvices.findByUrl(url) ?? 
        await siteSirvices.create(url)
    );

    const checkUserDuplicateSite = await checkUserHasSite(site._id, user_id);
    if (checkUserDuplicateSite) throw new AppError("This site has already been added.", 409, "SITE_EXISTS");

    const data: ISiteUsers = {
        user_id,
        site_id: site._id,
        title: setTitle
    };
    await siteUserServices.create(data);

    return reply.status(201).send(answer("SITE_CREATED", "Site created successfully."))
};


export const updateSite = async (req: FastifyRequest, reply: FastifyReply) => {
    const { url, title } = req.body as CreateSiteDto;
    const {user_id} = req.user;
    const {id} = req.params as idParamsDto;

    const site = await siteSirvices.find(id);
    if (!site) throw new AppError("Site not found", 404, "NOT_FOUND");

    const user = await userServices.find(user_id);
    if (!user) throw new AppError('User not found', 404, 'NOT_FOUND');

    const checkUserDuplicateSite = await siteUserServices.findBySiteAndUser(site._id, user_id);
    if (!checkUserDuplicateSite) throw new AppError("Site not found", 404, "NOT_FOUND");

    const setTitle = title ?? url;

    const checkUserDuplicateTitle = await siteUserServices.findByUserAndTitle(user_id, setTitle);
    if (checkUserDuplicateTitle && (checkUserDuplicateTitle._id.toString() !== checkUserDuplicateSite._id.toString())) throw new AppError("This title has already been used", 409, "DUPLICATE_TITLE");

    const siteByUrl = (
        await siteSirvices.findByUrl(url) ?? 
        await siteSirvices.create(url)
    );

    if(siteByUrl._id.toString() !== site._id.toString()) {
        const checkUserDuplicateNewSite = await checkUserHasSite(siteByUrl._id, user_id);
        if (checkUserDuplicateNewSite) throw new AppError("This site has already been added.", 409, "SITE_EXISTS");

        const urlValidateResult = await urlValidation(url);
        if (!urlValidateResult.ok) throw new AppError(`Url is not correct. ${urlValidateResult.error}`, 400, "INVALID_URL");
    }

    const data: ISiteUsers = {
        user_id,
        site_id: siteByUrl._id,
        title: setTitle
    };
    await siteUserServices.update(checkUserDuplicateSite._id, data);

    return reply.send(answer("SITE_UPDATED", "Site updated successfully."))
}