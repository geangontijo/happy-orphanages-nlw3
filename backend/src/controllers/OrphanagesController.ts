import { Request, Response } from "express";
import { getRepository } from "typeorm";
import Orphanage from "../models/Orphanage";
import Express from "express";

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

    let orphanage = orphangeRepository.create({
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends,
      images,
    });

    await orphangeRepository.save(orphanage);

    return res.status(201).json({
      status: true,
      message: "Orfanáto cadastrado com sucesso!",
      data: orphanage,
    });
  },

  async index(req: Request, res: Response) {
    const orphangeRepository = getRepository(Orphanage);

    return res.json({
      status: true,
      message: "Dados buscados com sucesso!",
      data: await orphangeRepository.find({
        relations: ["images"],
      }),
    });
  },

  async show(req: Request, res: Response) {
    const { id } = req.body;
    return res.json({
      status: true,
      message: "Orfanato buscado com sucesso!",
      data: await getRepository(Orphanage).findOneOrFail(id, {
        relations: ["images"],
      }),
    });
  },
};
