/**
 * Copyright (C) 2020 European Spallation Source ERIC.
 * <p>
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License
 * as published by the Free Software Foundation; either version 2
 * of the License, or (at your option) any later version.
 * <p>
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * <p>
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 59 Temple Place - Suite 330, Boston, MA  02111-1307, USA.
 */

import ologService from 'api/olog-service';
import { useState } from 'react';
import styled from 'styled-components';
import Modal from 'components/shared/Modal';
import Button from 'components/shared/Button';
import ErrorMessage from 'components/shared/input/ErrorMessage';
import { useRef } from 'react';

const Form = styled.form``;

const LogoutDialog = ({logoutDialogVisible, setShowLogout, setUserData}) => {

  const [logoutError, setLogoutError] = useState("");
  const logoutButtonRef = useRef();

  const hideLogout = () => {
      setLogoutError("");
      setShowLogout(false);
  }

  const logout = () => {
    ologService.get('/logout', { withCredentials: true })
      .then(res => {
        setLogoutError('');
        setUserData({userName: "", roles: []});
        hideLogout();
      }, error => { 
        if(!error.response){
          setLogoutError("Logout failed. Unable to connect to service.");
        }
    });
  }

  return(
    <Modal 
      open={logoutDialogVisible} 
      onClose={hideLogout} 
      title="Log out?"
      content={
        <Form>
          <br />
          <p>Would you like to logout?</p>
          <br />
          <ErrorMessage error={logoutError} />
        </Form>
      }
      actions={
        <>
          <Button variant="primary" onClick={logout} innerRef={logoutButtonRef} > 
            Yes
          </Button>
          <Button variant="secondary" onClick={hideLogout} >
            No
          </Button>
        </>
      }
    />
  )

}

export default LogoutDialog;