import { useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import instance from '../axiosUtil.jsx'
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';

function ModalDeactivate({isShow, setIsModal}) {
  const navigate = useNavigate()
  const onClickDeactivate = async() => {
    try {
      const user = {accessToken: Cookies.get("accessToken"),
                    client: Cookies.get("client"),
                    uid: Cookies.get("uid")}
      const response = await instance.delete(`/users`, user);
      console.log(response)
      setIsModal(false)
      navigate('/session/sign_in')
      alert('退会しました')
    } catch(error) {
      console.log(error)
    }
  }

  return (
    <>
    <Modal
    show={isShow}
    onHide={() => setIsModal(false)}
    size="lg"
    aria-labelledby="contained-modal-title-vcenter"
    centered
    animation={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>
          退会
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        退会します。よろしいでしょうか？
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setIsModal(false)}>キャンセル</Button>
        <Button variant="danger" onClick={() => onClickDeactivate()}>退会</Button>
      </Modal.Footer>
    </Modal>
    </>
  )
}

export default ModalDeactivate