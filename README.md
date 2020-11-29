# themebox

## ☄️ Usage

**javascript**

```ts
const config = {
  output: {
    css: {
      transforms: ['name/cti/kebab'],
      buildPath: './themes',
      files: [
        {
          destination: 'tokens.css',
          format: 'css/variables',
        },
      ],
    },
  },
}

const tokens = {
  color: {
    black500: {
      value: '#000',
    },
  },
}

fetch('https://themebox.now.sh', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    config,
    tokens: {
      language: 'json',
      content: tokens,
    },
  }),
})
```

## License

MPL-2.0
