# useComponent React hook

[![NPM Version][npm-image]][npm-url] ![NPM Downloads][downloads-image] [![GitHub issues][issues-image]][issues-url] [![Telegram][telegram-image]][telegram-url]

[npm-image]: https://img.shields.io/npm/v/use-component.svg
[npm-url]: https://www.npmjs.com/package/use-component
[downloads-image]: https://img.shields.io/npm/dw/use-component.svg
[issues-image]: https://img.shields.io/github/issues/doasync/use-component.svg
[issues-url]: https://github.com/doasync/use-component/issues
[telegram-image]: http://i.imgur.com/WANXk3d.png
[telegram-url]: https://t.me/doasync

Use component from prop or context, or fallback to specified component

## Installation

```bash
npm install use-component
```
or
```bash
yarn add use-component
```

## Usage

#### `useComponent`

```js
import { useComponent } from 'use-component'
```

Pass an entry of component itself, component, fallback, or components to the hook and get a resulting component:

```js
export const Input = ({
  children,
  component,
  ...fieldProps
}) => {
  const Component = useComponent({
    entry: { Input },
    component,
    fallback: 'input',
  });

  return (
    <Field {...fieldProps}>
      {({ input, meta, ...customProps }) => {
        return (
          <>
            {typeof Component === 'string' ? (
              <Component {...input} {...customProps} />
            ) : (
              <Component
                {...input}
                {...customProps}
                label={children}
                meta={meta}
                message={getErrorMessage(meta)}
              />
            )}
          </>
        );
      }}
    </Field>
  );
};
```

You can now pass any component as prop which will be used inside `Input` component. You can pass a styled component, for example, or any custom component, which will receive internal `input`, `meta`, `label` and `message` props.

You can also create a context provider:

```js
export const Form = ({
  children,
  onSubmit,
  component,
  components,
  ...otherProps
}) => {
  const Component = useComponent({
    entry: { Form },
    component,
    fallback: 'form',
    components,
  });

  const { handleSubmit } = useContext(FormContext);

  return (
    <ComponentContext.Provider value={components}>
      <Component onSubmit={onSubmit || handleSubmit} {...otherProps}>
        {children}
      </Component>
    </ComponentContext.Provider>
  );
};
```

And then just pass your components to it:

```js
  <Form
    component={FormBox}
    components={{
      Input: StyledInput,
      ErrorMessage: ErrorBox,
    }}
  >
    <Heading>Login</Heading>
    <LoginFormBox>
      <FieldBox>
        <FieldLabelText>Email</FieldLabelText>
        <Input
          type="text"
          name="login"
          placeholder="E-mail"
        />
      </FieldBox>
      <FieldBox>
        <FieldLabelText>Password</FieldLabelText>
        <Input
          component={CustomInput}
          type="password"
          name="password"
          placeholder="Password"
        />
      </FieldBox>
      <StyledButton type="submit">Login</StyledButton>
    </LoginFormBox>
  </Form>
```

You can still use your original `Input` and `ErrorMessage`, but they will use specified components under the hood passing to them some internal props.

### Tip

If you found this hook useful, please star this package on [GitHub](https://github.com/doasync/use-component) ★

### Author
@doasync
