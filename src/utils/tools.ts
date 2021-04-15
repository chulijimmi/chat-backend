export const debug = (stage: string, log: any) => {
  if (process.env.NODE_ENV === 'development') {
    console.log(stage, log);
  }
};
