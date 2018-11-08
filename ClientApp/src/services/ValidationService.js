const email = (email = "") => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

const nonEmptyString = (str = "") => str.trim().length > 0;

const url = (url = "") => {
  return true;
  // const pattern = new RegExp(
  //   "^(https?://)?" + // protocol
  //   "((([a-zd]([a-zd-]*[a-zd])*).)+[a-z]{2,}|" + // domain name
  //   "((d{1,3}.){3}d{1,3}))" + // OR ip (v4) address
  //   "(:d+)?(/[-a-zd%_.~+]*)*" + // port and path
  //   "(?[;&a-zd%_.~+=-]*)?" + // query string
  //     "(#[-a-zd_]*)?$",
  //   "i"
  // );
  // return pattern.test(url);
};

export const ValidationService = {
  email,
  nonEmptyString,
  url
};
