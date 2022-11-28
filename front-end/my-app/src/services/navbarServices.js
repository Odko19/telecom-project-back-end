const getArchives = async (checkedId) => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  var raw = JSON.stringify({
    archives: checkedId,
  });
  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };
  return fetch("http://localhost:3001/v1/archives", requestOptions);
};

export const archivesServices = {
  getArchives,
};
