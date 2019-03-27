const { useContext, createContext } = require('react');

const ComponentsContext = createContext();

const useComponent = ({
  entry,
  component,
  fallback,
  components: customComponents,
}) => {
  var [[componentName, self] = []] = Object.entries(entry || {});
  const fromContext = useContext(ComponentsContext);
  const components = customComponents || fromContext || {};
  const Component = component || components[componentName] || fallback;

  if (!Component) {
    throw new Error(`cannot use wrapper for ${componentName}`);
  }

  if (Component === self) {
    throw new Error(`${componentName} cannot wrap itself`);
  }

  return Component;
};

module.exports = {
  useComponent,
  ComponentsContext,
};
