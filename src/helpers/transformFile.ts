export const transformFile = (file: File) => {
    if (!(file instanceof File)) {
      return file;
    }
  
    const preview = URL.createObjectURL(file);
    const transformedFile = {
      rawFile: file,
      src: preview,
      title: file.name,
    };
    return transformedFile;
  };