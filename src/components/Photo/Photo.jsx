import React, { useEffect } from "react";
import { connect } from "react-redux";
import styles from "./Photo.module.scss";
import { createPortal } from "react-dom";
import { withRouter } from "react-router-dom";
import { getPhoto, clearPhoto } from "../../redux/photos";
const modalStyle = {
  position: "fixed",
  left: 0,
  top: 0,
  bottom: 0,
  right: 0,
  backgroundColor: "rgba(0,0,0,.2)",
  color: "##FFF",
  fontSize: "40px"
};

const Photo = props => {
  useEffect(() => {
    props.getPhoto(props.match.params.id);
    return () => props.clearPhoto();
  }, [props.match.params.id]);
  return createPortal(
    <div style={modalStyle} onClick={props.onClose}>
      <div className={styles.photoModal} onClick={(e) => e.preventDefault()}>
        {props.photo ? (
          <React.Fragment>
            <div>
              <img
                className={styles.profileImage}
                src={props.photo.user.profile_image.small}
              />
              <div>
                <div>{props.photo.user.name}</div>
                <div>@{props.photo.user.username}</div>
              </div>
            </div>
            <div className={styles.photoImgContainer}>
              <img className={styles.photoImg} src={props.photo.urls.regular} />
            </div>
          </React.Fragment>
        ) : (
          "Loading"
        )}
      </div>
    </div>,
    document.getElementById("modal_root")
  );
};

const mapStateToProps = state => ({
  photo: state.photosReducer.photo
});

const mapDispatchToProps = dispatch => ({
  getPhoto: id => dispatch(getPhoto(id)),
  clearPhoto: () => dispatch(clearPhoto())
});

const PhotoWithRedux = connect(mapStateToProps, mapDispatchToProps)(Photo);

const PhotoWithRouter = withRouter(PhotoWithRedux);

export { PhotoWithRouter as Photo };
