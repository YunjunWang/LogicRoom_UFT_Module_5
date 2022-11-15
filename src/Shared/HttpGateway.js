class HttpGateway {
  get = async path => {
    const response = await fetch(path);
    const dto = response.json();
    return dto;
  };
}

const httpGateway = new HttpGateway();
export default httpGateway;
