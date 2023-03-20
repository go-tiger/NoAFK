const UserService = require('../services/users.service');

// joi
const {
  modifyPasswordDataValidation,
  modifyNicknameDataValidation,
} = require('../utility/joi');

class UsersController {
  userService = new UserService();

  //* 백오피스 - 회원관리 페이지 렌더링
  renderAdminUserPage = (req, res) => {
    return res.status(200).render('admin/users');
  };

  //* 유저조회 페이지 렌더링
  // Todo <장빈> [컨트롤러] 유저조회 페이지 렌더, 유저조회
  renderSearchUserPage = async (req, res) => {
    return res.status(200).render('members');
  };

  //* 회원 전체 조회
  getAllUserInfo = async (req, res) => {
    try {
      const findAllUserInfo = await this.userService.findAllUserInfo();

      res.status(200).json(findAllUserInfo);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  };

  //* 회원 정보 조회
  getUserInfo = async (req, res) => {
    try {
      const { id } = req.params;
      const findUserInfo = await this.userService.findUserInfo(id);

      res.status(200).json(findUserInfo);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  };

  //* 회원 정보 수정 (password)
  updateUserPassword = async (req, res) => {
    try {
      const { id } = req.params;
      const { password } = await modifyPasswordDataValidation.validateAsync(
        req.body
      );
      const { status, message } = await this.userService.updateUserPassword(
        id,
        password
      );

      res.status(status).json({ message });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  };

  //* 회원 정보 수정 (nickname)
  updateUserNickname = async (req, res) => {
    try {
      const { id } = req.params;
      const { nickname } = await modifyNicknameDataValidation.validateAsync(
        req.body
      );
      const { status, message } = await this.userService.updateUserNickname(
        id,
        nickname
      );

      res.status(status).json({ message });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  };

  //* 회원 정보 수정 (introduction)
  updateUserIntroduction = async (req, res) => {
    try {
      const { id } = req.params;
      const { introduction } = req.body;
      const { status, message } = await this.userService.updateUserIntroduction(
        id,
        introduction
      );

      res.status(status).json({ message });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  };

  //* 회원 차단
  blockUser = async (req, res, next) => {
    try {
      const { userId } = req.params;

      await this.userService.blockUser(userId);

      res.status(200).json({ message: '선택한 회원을 차단하였습니다.' });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  };

  //* 회원 삭제
  deleteUser = async (req, res, next) => {
    try {
      const { userId } = req.params;

      await this.userService.deleteUser(userId);

      res.status(200).json({ message: '탈퇴 처리가 완료되었습니다.' });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  };

  // 마이페이지 렌더링
  renderMypage = async (req, res) => {
    try {
      const { id } = res.locals.user;
      const userInfo = await this.userService.userInfo(id);
      const { email, nickname, loginMethod, testResult, introduction, image, expiredAt } = userInfo;

      res.status(200).render('mypage', {id, email, nickname, loginMethod, testResult, introduction, image, expiredAt, pageTitle: "Mypage"});
    } catch (error) {
      return res.status(400).json({ message: "로그인 후 이용부탁드립니다." });
    }
  };

  // Todo <장빈> 유저조회,백오피스-회원조회
  getSearchUser = async (req, res, next) => {
    try {
      const currentPage = parseInt(req.query.page, 10) || 1;
      const perPage = parseInt(req.query.perPage, 10) || 10;
      const { pathUrl, sfl, stx } = req.query;

      const { users, totalPages, count } = await this.userService.getSearchUser(
        currentPage,
        perPage,
        pathUrl,
        sfl,
        stx
      );

      res.status(200).json({ users, currentPage, totalPages, count, pathUrl });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  };

  // 이미지 업로드
  uploadImage = async (req, res) => {
    try {
      return res.status(200).json({ image: req.file.location });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  };

  //* 회원 정보 수정 (image)
  updateUserImage = async (req, res) => {
    try {
      const { id } = req.params;
      const { image } = req.body;
      const { status, message } = await this.userService.updateUserImage(
        id,
        image
      );

      res.status(status).json({ message });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  };
}

module.exports = UsersController;
