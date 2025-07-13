import * as Yup from 'yup';

export const registerValidation = Yup.object().shape({
  fullName: Yup.string()
    .required('Vui lòng nhập họ và tên'),
  email: Yup.string()
    .email('Email không hợp lệ')
    .required('Vui lòng nhập email'),
  staffCode: Yup.string()
    .required('Vui lòng nhập mã nhân viên'),
  userName: Yup.string()
    .required('Vui lòng nhập tên đăng nhập')
    .min(5, 'Tên đăng nhập phải có ít nhất 5 ký tự')
    .max(30, 'Tên đăng nhập không được quá 30 ký tự'),
  password: Yup.string()
    .required('Vui lòng nhập mật khẩu')
    .min(8, 'Mật khẩu phải có ít nhất 8 ký tự')
    .max(16, 'Mật khẩu không được quá 16 ký tự')
    .matches(
      /^(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*\d)(?=.*[A-Za-z].*[A-Za-z]).*$/,
      'Mật khẩu phải chứa ít nhất 1 ký tự số, 1 ký tự đặc biệt và 2 ký tự chữ cái'
    ),
  role: Yup.string()
    .required('Vui lòng chọn quyền'),
});

export const loginValidation = Yup.object().shape({
  userName: Yup.string()
    .required('Vui lòng nhập tên đăng nhập'),
  password: Yup.string()
    .required('Vui lòng nhập mật khẩu'),
});

export const forgetPasswordValidation = Yup.object().shape({
  email: Yup.string()
    .email('Email không hợp lệ')
    .required('Vui lòng nhập email'),
  userName: Yup.string()
    .required('Vui lòng nhập tên đăng nhập'),
});

export const resetPasswordValidation = Yup.object().shape({
  email: Yup.string()
    .email('Email không hợp lệ')
    .required('Vui lòng nhập email'),
  userName: Yup.string()
    .required('Vui lòng nhập tên đăng nhập'),
  newPassword: Yup.string()
    .required('Vui lòng nhập mật khẩu mới')
    .min(8, 'Mật khẩu phải có ít nhất 8 ký tự')
    .max(16, 'Mật khẩu không được quá 16 ký tự')
    .matches(
      /^(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*\d)(?=.*[A-Za-z].*[A-Za-z]).*$/,
      'Mật khẩu phải chứa ít nhất 1 ký tự số, 1 ký tự đặc biệt và 2 ký tự chữ cái'
    ),
});
