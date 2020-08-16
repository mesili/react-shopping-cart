## Shopping Cart in React 

This was a task for a job interview I did a while ago and I think it could be a nice learning resource for people wanting to see how to use redux with hooks in a scalable fashion (domain driven style). 

This is far from a perfect implementation so bear with me. 

Created with `create-react-app`.

### Details 

- State management : Redux ( + redux-thunk) 
- Routing : react-router-dom 
- Theming : 
 - icons : react-icons (font-awesome) 
 - css : node-sass (scss) 


### Routes

 - `/cart` 
 - `/products` 

### src Folder structure

```
/components      common components with no side effect
/data            provided data
/domain          domain-specific folders
  /Products        Products related components and state
  /Cart            Cart related components and state
/helpers         various helpers functions
/store           redux store
/theme           global scss files

```

### Known issues 

- The currency was not initially US dollars, prices are handled as `integer` instead of `float`.
- Clicking outside of the cart panel collapses it, so if you click on a `add to cart` button, the panel will flicker a bit.
- There are no tests
