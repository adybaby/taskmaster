/* eslint-disable no-underscore-dangle */
import React from 'react';
import { useSelector } from 'react-redux';
import { EditAvailability } from './EditAvailability';
import { FormikTextField } from '../formik/FormikTextField';
import { FormikArrayField } from '../formik/FormikArrayField';
import { FormikForm } from '../formik/FormikForm';

const permissions = {
  ADMIN: { label: 'Administrator', value: 'admin' },
  DRIVERS: { label: 'Can Add Drivers', value: 'upsertDrivers' },
  ENABLERS: { label: 'Can Add Enablers', value: 'upsertEnablers' },
};

export const EditUser = ({ onClose, onError, user, currentUser }) => {
  const skills = useSelector((state) => state.skills);

  const initialValues = {
    firstNames: user.firstNames == null ? '' : user.firstNames.join(' '),
    lastName: user.lastName == null ? '' : user.lastName,
    emailAddress: user.emailAddress == null ? '' : user.emailAddress,
    bio: user.bio == null ? '' : user.bio,
    skillIds: user.skillIds == null ? [] : user.skillIds,
    available: user.available == null ? [] : user.available,
    permissions: user.permissions == null ? [] : user.permissions,
  };

  const validation = (values) => {
    const errors = {};
    if (!values.firstNames) {
      errors.firstNames = 'You must enter your first name(s)';
    }
    if (!values.lastName) {
      errors.lastName = 'You must enter your surname';
    }
    if (!values.emailAddress) {
      errors.emailAddress = 'You must enter your email address';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.emailAddress)) {
      errors.emailAddress = 'Invalid email address';
    }
    return errors;
  };

  const prepareValues = (values) => {
    let validatedPermissions = values.permissions;
    if (validatedPermissions.includes('admin')) {
      validatedPermissions = ['admin', 'upsertDrivers', 'upsertEnablers'];
    } else if (validatedPermissions.includes('upsertDrivers')) {
      validatedPermissions = ['upsertDrivers', 'upsertEnablers'];
    }

    return {
      ...user,
      ...values,
      permissions: validatedPermissions,
      firstNames: values.firstNames.split(' ').map((fn) => fn.trim()),
    };
  };

  // eslint-disable-next-line no-unused-vars
  const renderFields = (formik) => (
    <>
      <FormikTextField
        title="First Name(s)"
        field="firstNames"
        hint="What is your first name and middle names, seperated by spaces?"
        autoFocus
        mandatory
      />
      <FormikTextField
        title="Last name"
        field="lastName"
        hint="What is your surname (family name)?"
        mandatory
      />
      <FormikTextField
        title="Email Address"
        field="emailAddress"
        hint="What is your email address? (used to contact you during vacancy applications)"
        mandatory
      />
      <FormikTextField
        title="Bio"
        field="bio"
        hint="For example, your experience and what type of work you do and don't like."
      />
      <FormikArrayField
        title="Skills"
        field="skillIds"
        options={skills.map((skill) => ({ label: skill.title, value: skill.id }))}
        multiple
        hint="What skill groups do you want to be recognised under? This is used to help filter
vacancies which you might be interested in, and give a view on overall skills availability
and shortages across TaskMaster."
      />
      <EditAvailability />
      {currentUser.permissions.includes('admin') ? (
        <FormikArrayField
          title="Permissions"
          field="permissions"
          options={Object.values(permissions)}
          multiple
        />
      ) : null}
    </>
  );

  return (
    <FormikForm
      preEditedEntity={user}
      entityName="User"
      upsertMethod="upsertUser"
      initialValues={initialValues}
      validation={validation}
      renderFields={renderFields}
      prepareValues={prepareValues}
      onUpdated={onClose}
      onError={onError}
    />
  );
};
