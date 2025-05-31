export interface ProductDetailed {
  id: string;
  key: string;
  masterData: {
    current: {
      name: {
        'en-US': string,
      },
      categories: {
        typeId: string,
        id: string,
      },
      description: {
        'en-US': string,
      },
      masterVariant: {
        sku: string | number,
        key: string | number,
        images: [
          {
            url: string,
          },
        ],
        prices: [
          {
            discounted: {
              value: {
                currencyCode: string,
                centAmount: number,
              }
            },
            value: {
              centAmount: number,
              currencyCode: string,
            }
          },
        ],
      },
    },
  };
}
