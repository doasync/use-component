# useComponent React hook

[![NPM Version][npm-image]][npm-url] ![NPM Downloads][downloads-image] [![GitHub issues][issues-image]][issues-url] [![Telegram][telegram-image]][telegram-url]

[npm-image]: https://img.shields.io/npm/v/use-component.svg
[npm-url]: https://www.npmjs.com/package/use-component
[downloads-image]: https://img.shields.io/npm/dw/use-component.svg
[issues-image]: https://img.shields.io/github/issues/doasync/use-component.svg
[issues-url]: https://github.com/doasync/use-component/issues
[telegram-image]: http://i.imgur.com/WANXk3d.png
[telegram-url]: https://t.me/doasync

Get the resulting component you want to wrap inside your target component by checking props, context or a fallback.

## Installation

```bash
npm install use-component
```
or
```bash
yarn add use-component
```
## Example

https://codesandbox.io/s/vm2zlr1qo3

## Usage

### `useComponent`

```js
import { useComponent } from 'use-component'
```

Pass an entry of current component to the hook (this means that you need wrap your current component in an object and pass it to the entry option) as well as component from prop, a fallback, or an object of components and you will get a resulting component:

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

```js
<Input
  component={CustomInput}
  type="password"
  name="password"
  placeholder="Password"
/>
```

### `ComponentsContext`

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
    <ComponentsContext.Provider value={components}>
      <Component onSubmit={onSubmit || handleSubmit} {...otherProps}>
        {children}
      </Component>
    </ComponentsContext.Provider>
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

You can still use your original `Input` and `ErrorMessage`, but they will use your specified components under the hood passing  some internal props to them.

### Tip

If you found this hook useful, please star this package on [GitHub](https://github.com/doasync/use-component) ★

### Author
@doasync
