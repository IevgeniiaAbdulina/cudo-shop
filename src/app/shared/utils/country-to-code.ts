export const countryNameCode = (countryName: string) => {
  let country = '';
  switch (countryName) {
    case 'Poland':
      country = 'PL';
      break;
    case 'Germany':
      country = 'GE';
      break;
    case 'USA':
      country = 'US';
      break;
    default:
      country = 'UNDEFINED';
      break;
  }

  return country;
};
