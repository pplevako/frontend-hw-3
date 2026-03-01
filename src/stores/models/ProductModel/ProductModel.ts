type ImageFormat = {
  url: string;
  width: number;
  height: number;
};

type ProductImage = {
  url: string;
  width: number;
  height: number;
  formats: Record<string, ImageFormat>;
};

export type ProductCategoryModel = {
  id: number;
  title: string;
};

class ProductModel {
  id: number;
  documentId: string;
  title: string;
  description: string;
  price: number;
  category: ProductCategoryModel | null = null;
  images: ProductImage[] = [];

  // TODO: add API type
  constructor(data: any) {
    this.id = data.documentId;
    this.documentId = data.documentId;
    this.title = data.title;
    this.description = data.description;
    this.price = data.price;

    if (data.productCategory) {
      this.category = {
        id: data.productCategory.documentId,
        title: data.productCategory.title,
      };
    }

    if (Array.isArray(data.images)) {
      this.images = data.images.map((image: unknown) => this.transformImage(image));
    }
  }

  // TODO: add API type
  private transformImage(image: any): ProductImage {
    const formats: Record<string, ImageFormat> = {};
    if (image.formats && typeof image.formats === 'object') {
      Object.entries(image.formats).forEach(([format, img]: [string, any]) => {
        formats[format] = {
          url: img.url,
          width: img.width,
          height: img.height,
        };
      });
    }

    return {
      url: image.url,
      width: image.width,
      height: image.height,
      formats,
    };
  }

  // TODO: access other images as well
  get mainImageUrl(): string {
    return this.images[0]?.url || '';
  }

  // TODO: access other images as well
  getImageUrl(format: string): string {
    return this.images[0]?.formats[format]?.url || '';
  }

  get categoryTitle(): string | undefined {
    return this.category?.title;
  }
}

export default ProductModel;
