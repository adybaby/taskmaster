/* eslint-disable no-underscore-dangle */
import React from 'react';
import { TextField, Typography, Button } from '@material-ui/core';
import { Formik, FieldArray, Form } from 'formik';
import { useSelector } from 'react-redux';
import { useStyles, typographyVariant } from '../../styles/Styles';
import * as logger from '../../util/Logger';
import * as db from '../../db/Db';
import { DropDown } from '../DropDown';
import { EditAvailability } from './EditAvailability';

const variant = typographyVariant.task;

const permissions = {
  ADMIN: { label: 'Administrator', value: 'admin' },
  DRIVERS: { label: 'Can Add Drivers', value: 'upsertDrivers' },
  ENABLERS: { label: 'Can Add Enablers', value: 'upsertEnablers' },
};

export const EditUser = ({ onClose, onError, user, currentUser }) => {
  const classes = useStyles()();
  const skills = useSelector((state) => state.skills);

  const cleanedUserSkills = () => {
    if (user.skills == null) return [];
    if (typeof user.skills[0] === 'string') return user.skills;
    return user.skills.map((s) => s.id);
  };

  const initialValues = {
    firstNames: user.firstNames == null ? '' : user.firstNames.join(' '),
    lastName: user.lastName == null ? '' : user.lastName,
    emailAddress: user.emailAddress == null ? '' : user.emailAddress,
    bio: user.bio == null ? '' : user.bio,
    skills: cleanedUserSkills(),
    available: user.available == null ? [] : user.available,
    permissions: user.permissions == null ? [] : user.permissions,
  };

  const getValidation = (values) => {
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

  const onSubmit = (values, { setSubmitting }) => {
    let validatedPermissions = values.permissions;
    if (validatedPermissions.includes('admin')) {
      validatedPermissions = ['admin', 'upsertDrivers', 'upsertEnablers'];
    } else if (validatedPermissions.includes('upsertDrivers')) {
      validatedPermissions = ['upsertDrivers', 'upsertEnablers'];
    }
    const update = {
      ...user,
      ...values,
      permissions: validatedPermissions,
      firstNames: values.firstNames.split(' ').map((fn) => fn.trim()),
    };
    db.upserttUser(update)
      .then((updatedUser) => {
        setSubmitting(false);
        onClose(updatedUser);
      })
      .catch((e) => {
        const errorMessage = `There was a problem updating user details: ${e.message}`;
        logger.error(errorMessage, e, update);
        setSubmitting(false);
        onError(errorMessage);
      });
  };
  const makeField = (formik, title, value, hint, autoFocus = false) => (
    <>
      <Typography className={classes.userSectionHeading} variant={variant.heading}>
        {title}
      </Typography>
      <Typography variant="body2">
        <i>{hint}</i>
      </Typography>
      <TextField
        value={formik.values[value]}
        name={value}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        variant="outlined"
        multiline
        fullWidth
        className={classes.userSectionBody}
        autoFocus={autoFocus}
        error={formik.touched[value] && formik.errors[value] != null}
        helperText={formik.errors[value]}
      />
    </>
  );

  const makeAvailabilityField = (formik) => (
    <>
      <Typography className={classes.userSectionHeading} variant={variant.heading}>
        Availability
      </Typography>
      <Typography variant="body2">
        <i>
          When are you available for work? This does not commit you to be available, but helps us
          see which skills are available at which times, and where they may be shortages.
        </i>
      </Typography>

      <FieldArray
        name="available"
        render={(arrayHelpers) => (
          <EditAvailability
            value={formik.values.available}
            onAdd={(range) => {
              logger.debug('Adding availability', range);
              arrayHelpers.push(range);
            }}
            onRemove={(range) => {
              logger.debug('Removing availability ', range);
              arrayHelpers.remove(formik.values.available.find((r) => r === range));
            }}
            style={{ paddingBottom: '14px', paddingTop: '14px' }}
          />
        )}
      />
    </>
  );

  const makeFooter = (formik) => (
    <div zindex="9999" className={`${classes.editTaskFooter} ${formik.dirty ? 'open' : undefined}`}>
      <div className={classes.taskEditedMessageDiv}>
        <Typography className={classes.taskEditedMessage}>
          Your changes will not be saved until you confirm them
        </Typography>
      </div>
      <Button style={{ color: 'lightGrey' }} onClick={formik.handleReset}>
        CANCEL CHANGES
      </Button>
      <Button type="submit" style={{ color: 'white' }} disabled={formik.isSubmitting}>
        <b>CONFIRM CHANGES</b>
      </Button>
    </div>
  );

  const makeSkillsField = (formik) => (
    <>
      <Typography className={classes.taskSectionHeading} variant={variant.heading}>
        Skills
      </Typography>
      <Typography variant="body2">
        <i>
          What skill groups do you want to be recognised under? This is used to help filter
          vacancies which you might be interested in, and give a view on overall skills availability
          and shortages across TaskMaster.
        </i>
      </Typography>
      <FieldArray
        name="skills"
        render={(arrayHelpers) => (
          <DropDown
            divStyle={{ paddingBottom: '14px' }}
            id="skills"
            value={formik.values.skills}
            multiple
            fullWidth
            items={skills.map((skill) => ({ label: skill.title, value: skill.id }))}
            onAdd={(id, selectedSkills, addedSkillId) => {
              logger.debug(`Adding skill with id ${addedSkillId}`);
              arrayHelpers.push(addedSkillId);
            }}
            onDelete={(id, selectedSkills, removedSkillId) => {
              logger.debug(`Removing skill with id ${removedSkillId}`);
              arrayHelpers.remove(
                formik.values.skills.findIndex((skillId) => skillId === removedSkillId)
              );
            }}
          />
        )}
      />
    </>
  );

  const makePermissionsField = (formik) => (
    <>
      <Typography className={classes.taskSectionHeading} variant={variant.heading}>
        Permissions
      </Typography>
      <FieldArray
        name="permissions"
        render={(arrayHelpers) => (
          <DropDown
            divStyle={{ paddingBottom: '14px' }}
            id="permissions"
            value={formik.values.permissions}
            multiple
            fullWidth
            items={Object.values(permissions)}
            onAdd={(id, selectedPermissions, addedPermission) => {
              logger.debug(`Adding permission ${addedPermission}`);
              arrayHelpers.push(addedPermission);
            }}
            onDelete={(id, selectedPermissions, removedPermission) => {
              logger.debug(`Removing permission  ${removedPermission}`);
              arrayHelpers.remove(
                formik.values.permissions.findIndex(
                  (permission) => permission === removedPermission
                )
              );
            }}
          />
        )}
      />
    </>
  );

  return (
    <Formik initialValues={initialValues} validate={getValidation} onSubmit={onSubmit}>
      {(formik) => (
        <Form>
          <div className={classes.taskContent}>
            {makeField(
              formik,
              'First Name(s)',
              'firstNames',
              'What is your first name and middle names, seperated by spaces?',
              true
            )}
            {makeField(formik, 'Last name', 'lastName', 'What is your surname (family name)?')}
            {makeField(
              formik,
              'Email Address',
              'emailAddress',
              'What is your email address? (used to contact you during vacancy applications)'
            )}
            {makeField(
              formik,
              'Bio',
              'bio',
              "For example, your experience and what type of work you do and don't like."
            )}
            {makeSkillsField(formik)}
            {makeAvailabilityField(formik)}
            {currentUser.permissions.includes('admin') ? makePermissionsField(formik) : null}
          </div>
          {makeFooter(formik)}
        </Form>
      )}
    </Formik>
  );
};
