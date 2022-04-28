const { Voucher, UserVoucher, User } = require("../../models");
const AppError = require("../../helpers/appError.helper");

class VoucherService {
    constructor(partner) {
        this.partner = partner;
    }

    async getVoucherFromCode(code) {
        const voucher = await Voucher.findOne({
            where: {
                voucherCode: code,
                partnerId: this.partner.id
            },
        });

        if (!voucher) throw new AppError("Voucher không tồn tại !", 400);

        return voucher;
    }

    async getUserVoucher(voucher, userId) {
        const user = await User.findOne({
            where: {
                userId,
            }
        });

        const userVoucher = await UserVoucher.findOne({
            where: {
                voucherId: voucher.id,
                userId: user.id
            },
        });

        if (!userVoucher) throw new AppError("Voucher không tồn tại !", 400);

        return userVoucher;
    }

}

module.exports = VoucherService;