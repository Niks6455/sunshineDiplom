import ProfileDto from "./profile-dto.js";

export default class OrderDto {
    id;
    uesr;
    date;
    status;
    phoneNumber;
    createdAt;
    constructor(model) {
        this.id = model.id;
        this.uesr = model.User ? new ProfileDto(model.User) : null;
        this.date = model.date;
        this.status = model.status;
        this.phoneNumber = model.phoneNumber;
        this.createdAt = model.createdAt;
    }
}