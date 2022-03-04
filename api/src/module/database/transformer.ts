export const PhoneNumberTransformer = {
  // DB => ORM
  from: (value: string) => {
    if (value === null || value === undefined) return null;
    return value.replace(/-/, "");
  },
  // ORM => DB
  to: (value: string) => {
    if (value === null || value === undefined) return null;
    return value.replace(/-/, "");
  },
};
