import React from 'react'
import { Modal } from "react-bootstrap";

export default function SectionSetting({ active, handleClose }) {
    return (
        <Modal show={active} onHide={() => handleClose()} centered>
            <Modal.Header>
                <Modal.Title>
                    <h5 className="title title--h1 first-title title__separate mb-0">
                        Setting
                    </h5>
                </Modal.Title>

                <button type="button" className="close" onClick={() => handleClose()}>
                    <span aria-hidden="true">×</span>
                    <span className="sr-only">Close alert</span>
                </button>
            </Modal.Header>

            <Modal.Body>
                
            </Modal.Body>
        </Modal>
    )
}
