import { ProfileUI } from '@ui-pages';
import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { getUserState, updateUser } from '../../services/userSlice';

export const Profile: FC = () => {
  const dispatch = useDispatch();
  const { userData } = useSelector(getUserState);

  const [formValue, setFormValue] = useState({
    name: userData?.name || '',
    email: userData?.email || '',
    password: ''
  });

  const [nameDisabled, setNameDisabled] = useState(true);
  const [emailDisabled, setEmailDisabled] = useState(true);
  const [passwordVisible, setPasswordVisible] = useState(false);

  useEffect(() => {
    const next = {
      name: userData?.name || '',
      email: userData?.email || ''
    };
    setFormValue((prev) =>
      prev.name === next.name && prev.email === next.email
        ? prev
        : { ...prev, ...next }
    );
  }, [userData?.name, userData?.email]);

  const isFormChanged =
    formValue.name !== (userData?.name || '') ||
    formValue.email !== (userData?.email || '') ||
    !!formValue.password;

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    const payload: { name?: string; email?: string; password?: string } = {};
    if (formValue.name !== (userData?.name || ''))
      payload.name = formValue.name;
    if (formValue.email !== (userData?.email || ''))
      payload.email = formValue.email;
    if (formValue.password) payload.password = formValue.password;
    if (Object.keys(payload).length > 0) {
      dispatch(updateUser(payload));
    }
  };

  const handleCancel = (e: SyntheticEvent) => {
    e.preventDefault();
    setFormValue({
      name: userData?.name || '',
      email: userData?.email || '',
      password: ''
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValue((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <ProfileUI
      formValue={formValue}
      isFormChanged={isFormChanged}
      handleCancel={handleCancel}
      handleSubmit={handleSubmit}
      handleInputChange={handleInputChange}
      nameDisabled={nameDisabled}
      emailDisabled={emailDisabled}
      onNameIconClick={() => setNameDisabled((v) => !v)}
      onEmailIconClick={() => setEmailDisabled((v) => !v)}
      passwordType={passwordVisible ? 'text' : 'password'}
      onPasswordIconClick={() => setPasswordVisible((v) => !v)}
    />
  );
};
