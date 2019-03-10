export function canBeDeleted(food) {
  return food && food.status === 'UNHEALTHY';
}

export const LANGUAGE_NONE = 'NONE';

const BusinessLogic = {
  canBeDeleted,
  LANGUAGE_NONE,
};

export default BusinessLogic;
