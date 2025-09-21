import { ChangeEvent, SyntheticEvent } from 'react';

export type ProfileUIProps = {
  formValue: {
    name: string;
    email: string;
    password: string;
  };
  isFormChanged: boolean;
  handleSubmit: (e: SyntheticEvent) => void;
  handleCancel: (e: SyntheticEvent) => void;
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  updateUserError?: string;
  nameDisabled: boolean;
  emailDisabled: boolean;
  onNameIconClick: () => void;
  onEmailIconClick: () => void;
  passwordType: 'password' | 'text';
  onPasswordIconClick: () => void;
};
