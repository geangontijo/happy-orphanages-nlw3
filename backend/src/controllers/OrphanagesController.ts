import { ErrorRequestHandler, Request, Response } from "express";
import { getRepository } from "typeorm";
import Orphanage from "../models/Orphanage";
import Express from "express";
import OrphanagesView from "../view/OrphanagesView";
import * as Yup from "yup";

export default {
  async create(req: Request, res: Response) {
    const {
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends,
    } = req.body;

    const orphangeRepository = getRepository(Orphanage);

    const requestImages = req.files as Express.Multer.File[];

    const images = requestImages.map((img) => {
      return { path: img.filename };
    });

    const data = {
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends,
      images,
    };

    const schema = Yup.object().shape({
      name: Yup.string().required(),
      latitude: Yup.number().required(),
      longitude: Yup.number().required(),
      about: Yup.string().required().max(300),
      instructions: Yup.string().required(),
      opening_hours: Yup.string().required(),
      open_on_weekends: Yup.bool().required(),
      images: Yup.array(
        Yup.object().shape({
          path: Yup.string().required(),
        })
      ),
    });

    try {
      await schema.validate(data, {
        abortEarly: false,
      });
    } catch (error) {
      let returnValidation: any[] = [];
      error.inner.forEach(
        (element: any) => (returnValidation[element.path] = element.errors)
      );
      return res.status(400).json({
        status: false,
        message: error.message,
        data: returnValidation,
      });
    }
    let orphanage = orphangeRepository.create(data);

    await orphangeRepository.save(orphanage);

    return res.status(201).json({
      status: true,
      message: "Orfanáto cadastrado com sucesso!",
      data: OrphanagesView.render(orphanage),
    });
  },

  async index(req: Request, res: Response) {
    const orphangeRepository = getRepository(Orphanage);
    return res.json({
      status: true,
      message: "Dados buscados com sucesso!",
      data: OrphanagesView.renderMany(
        await orphangeRepository.find({
          relations: ["images"],
        })
      ),
    });
  },

  async show(req: Request, res: Response) {
    const { id } = req.params;
    return res.json({
      status: true,
      message: "Orfanato buscado com sucesso!",
      data: OrphanagesView.render(
        await getRepository(Orphanage).findOneOrFail(id, {
          relations: ["images"],
        })
      ),
    });
  },
};
