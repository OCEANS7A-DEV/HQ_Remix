

const sleep = (time:number) => new Promise((resolve) => setTimeout(resolve, time));

export const Print = async () => {
  await sleep(1);
  await new Promise<void>((resolve) => {
    const onAfterPrint = () => {
      window.removeEventListener('afterprint', onAfterPrint);
      resolve();
    };
    window.addEventListener('afterprint', onAfterPrint);
    window.print();
  });
}






