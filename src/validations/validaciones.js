async function postUploadfileValidations(req) {
  if (req.body.producto && req.body.precio && req.body.img_url && req.body.stock && req.body.categoria) {
    return true;
  }
  return false;
}
async function putIdValisations(req) {
  if (req.params) {
    return true;
  }
  return false;
}
async function deleteIdValidations(req) {
  if (req.params) {
    return true;
  }
  return false;
}

module.exports = { deleteIdValidations, putIdValisations, postUploadfileValidations };
