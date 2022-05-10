export default (context) => {

    if (context && context.req && context.req.headers) {
      console.log("context.req.headers.host",context.req.headers.host)
      context.store.state.list.windowOrigin = context.req.headers.host;
    }
  };