import OrphanageImage from "../models/OrphanageImage";

export default {
  render(image: OrphanageImage) {
    return {
      id: image.id,
      path: `http://192.168.100.13:3333/uploads/${image.path}`,
    };
  },

  renderMany(images: OrphanageImage[]) {
    return images.map((item) => this.render(item));
  },
};
