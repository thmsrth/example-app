import {
  shape,
  number,
  string,
} from 'prop-types';

const image = shape({
  id: number,
  originalImage: string,
  path: string,
  data: shape({
    files: shape({
      l: shape({
        fileSize: number,
        height: number,
        path: string,
        width: number,
      }),
      m: shape({
        fileSize: number,
        height: number,
        path: string,
        width: number,
      }),
      original: shape({
        fileSize: number,
        height: number,
        path: string,
        width: number,
      }),
      s: shape({
        fileSize: number,
        height: number,
        path: string,
        width: number,
      }),
      xl: shape({
        fileSize: number,
        height: number,
        path: string,
        width: number,
      }),
      xs: shape({
        fileSize: number,
        height: number,
        path: string,
        width: number,
      }),
    }),
  }),
});

export default image;
