export const readTextFile = (fileName) =>
  new Promise((resolve, reject) => {
    fetch(fileName)
      .then((res) => {
        if (res.status !== 200) {
          reject(new Error('No file found'));
        }
        return res.blob();
      })
      .then((file) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          resolve(event.target.result);
        };

        reader.readAsText(file);
      })
      .catch((e) => {
        reject(e);
      });
  });
