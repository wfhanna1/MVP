export class Player {
  constructor ({
    id = undefined,
    fullName = '',
    emailAddress = '',
    profilePhoto = ''
  } = {}) {
    this.id = id;
    this.fullName = fullName;
    this.emailAddress = emailAddress;
    this.profilePhoto = profilePhoto;
  }

  toJSON = () => {
    return JSON.stringify({
      id: this.id,
      fullName: this.fullName,
      emailAddress: this.emailAddress,
      profilePhoto: this.profilePhoto
    })
  }
}