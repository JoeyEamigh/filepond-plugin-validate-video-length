# Video Length Validation plugin for FilePond

Filepond Plugin Docs: <https://pqina.nl/filepond/docs/patterns/plugins/>

NPM Package: <https://www.npmjs.com/package/filepond-plugin-validate-video-length>

The Video Length Validation plugin handles blocking of files that are of the wrong duration.

Installation:

```sh
npm install filepond-plugin-validate-video-length
yarn add filepond-plugin-validate-video-length
```

Notes:

- This plugin depends on <https://www.npmjs.com/package/get-blob-duration>, so make sure to add that if you are using a CDN.

FilePond Configs:

```ts
{
  allowVideoLengthValidation?: boolean;
  maxVideoLength?: number;
  minVideoLength?: number;
}
```

Might be buggy. Have fun!
