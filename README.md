### install the dependencies
```
npm install
```

### Run development server `http://localhost:8888/`
```
npm start
// or
npm run dev
```

### To build the production package
```
npm run build
```

### Notes on importing css styles
* styles having /src/ in their absolute path are considered part of the application and exported as local css modules.
* other styles are considered global styles used by many components and are included in the css bundle directly.

