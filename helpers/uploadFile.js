const path = require( 'path' );
const { v4: uuidv4 } = require( 'uuid' );

const uploadFile = (
  files,
  validExtensions = ['png', 'jpg', 'jpeg', 'gif'],
  folder = ''
) =>
{
  return new Promise( ( resolve, reject ) =>
  {
    const { file } = files;
    const nameCut = file.name.split( '.' );
    const extension = nameCut[nameCut.length - 1];
    // Validate extension
    if ( !validExtensions.includes( extension ) )
    {
      return reject(
        `Extension ${extension} is not allowed. Only ${validExtensions}`
      );
    }
    const tempName = uuidv4() + '.' + extension;
    const uploadPath = path.join( __dirname, '../uploads/', folder, tempName );

    file.mv( uploadPath, err =>
    {
      if ( err )
      {
        reject( err );
      }
      resolve( tempName );
    } );
  } );
};

module.exports = {
  uploadFile,
};
