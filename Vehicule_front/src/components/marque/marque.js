import React, { useState } from "react";
import { Card } from 'antd';
import {base_url, upload, staticUrl} from "../../config/api.json";
import { getAllMarques , getMarqueId, updateMarque, addMarque}  from '../../services/vehiculeService'
import { Modal ,Input, Button } from 'antd';
import { Upload, message } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';


export class Marques extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            Marques:[],
            code_marque:'',
            libelle_marque:'',
            img:null,
            ModalVisible:false ,
            ModalState:null,
            modalText:'Content of the modal'
        }
    }
    state = {
        loading: false,
    };
    
   

    componentDidMount(){

        this.getAllMarques()

    }
    getAllMarques(){
        getAllMarques().then(mq => {
            if(mq.status){
                this.setState({
                    Marques:mq.data
                })
            }
        })
    }

    handleChange = async (info) => {

        await this.setState({
            img:info.file.name
        })

        if (info.file.status === 'uploading') {
          this.setState({ loading: true });
          return;
        }
        if (info.file.status === 'done') {
          // Get this url from response in real world.
          getBase64(info.file.originFileObj, imageUrl =>
            this.setState({
              imageUrl,
              loading: false,
            }),
          );
        }
        // console.log(this.state)
    };

    async onOpenModal(code,type, info){
 
        if(type === 'edit'){
            await getMarqueId(code).then(res => {
                if(res.status){
                    this.setState({
                        code_marque:res.data[0].code_marque,
                        libelle_marque:res.data[0].libelle_marque,
                        img:res.data[0].img,
                        imageUrl:res.data[0].img ? `${base_url}${staticUrl}marque/${res.data[0].img}` : null
                    })
                }
            })
            this.setState({
                ModalVisible:true,
                ModalState:type,
            })
        }else if(type === 'add'){
            this.setState({
                ModalVisible:true,
                ModalState:type
            })
        }

    }

    onRegister = () => {

        if(this.state.ModalState === 'edit'){

            updateMarque({
                code_marque:this.state.code_marque,
                libelle_marque:this.state.libelle_marque,
                img:this.state.img
            }, this.state.code_marque).then(res => {
                this.getAllMarques()
                Modal.success({
                    content:res.message,
                });
                useState({
                    code_marque:'',
                    libelle_marque:'',
                    img:null
                })
                this.setState({
                    ModalVisible:false
                })

            })

        }else{

            addMarque({
                code_marque:this.state.code_marque,
                libelle_marque:this.state.libelle_marque,
                img:this.state.img
            }).then(res => {
               if(res.status){
                this.getAllMarques()
                Modal.success({
                    content:res.message,
                });
                this.setState({
                    code_marque:'',
                    libelle_marque:'',
                    img:null,
                    ModalVisible:false
                })
               }
            })

        }

    };
  
    handleCancel = () => {
        this.setState({
            ModalVisible:false
        })
    };

    onInput = async (e) => {

        const name = e.target.name
        const value = e.target.value
        await this.setState({    
            [name]:  value 
        })
        // console.log(this.state)


    }

    render(){
        const { loading, imageUrl } = this.state;
        const uploadButton = (
          <div>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Upload</div>
          </div>
        );
        const gridStyle = {
            width: '25%',
            textAlign: 'center',
            cursor:'pointer'
          };
        
     
        return(

            <div className="main-content">
                <h4 style={{display:'inline-block'}} >Les Marques des voitures </h4>
                <Button type="primary" onClick={this.onOpenModal.bind(this, '', 'add')} style={{display:'inline-block', float:'right'}}> 
                    Ajouter  &nbsp;
                    <svg width="20px" xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </Button>

                <hr/>
                <Card >

                    {
                        this.state.Marques.map(marque => {
                            return(
                                <Card.Grid key={marque.code_marque} onClick={this.onOpenModal.bind(this, marque.code_marque, 'edit')} style={gridStyle}>
                                    <div className="text-center">
                                        <span>{marque.libelle_marque}</span>
                                        <div style={{margin:'10px'}}>
                                            <img  src={`${base_url}${staticUrl}marque/${marque.img}`} alt="" style={{width:95.5, height:51.25}}  />
                                        </div>
                                    </div>
                                </Card.Grid>
                            )
                        })
                    }

                </Card>
                <Modal
                    title={this.state.ModalState === 'edit' ? this.state.libelle_marque : 'Nouveau marque'}
                    visible={this.state.ModalVisible}
                    onCancel={this.handleCancel}
                    footer={[
                        <button key="back"  className="btn btn-sm btn-secondary"style={{marginRight:'7px'}}  onClick={this.handleCancel}>
                            Anuler
                        </button> ,
                        <button key="save" type="primary" className="btn btn-sm btn-success" onClick={this.onRegister}>
                          Enregistrer
                        </button>
                    ]}
                >
                <form>

                    <div className="row">
                        <div className="col-sm-9">
                            <label>Code marque :</label>
                            <Input id="code_marque" name="code_marque" value={this.state.code_marque } onChange={this.onInput}  placeholder="Entrer le code" />
                            <label>Libelle marque :</label>
                            <Input id="libelle_marque" name="libelle_marque" value={ this.state.libelle_marque} onChange={this.onInput} placeholder="Entrer le nom" />
                        </div>
                        <div className="col-sm-3">
                            <div style={{paddingTop:'20px'}}>
                                <Upload
                                    name="logo"
                                    listType="picture-card"
                                    className="avatar-uploader"
                                    showUploadList={false}
                                    action={`${base_url}${upload}logo`}
                                    beforeUpload={beforeUpload}
                                    onChange={this.handleChange}
                                >
                                    {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                                </Upload>
                            </div>
                        </div>
                    </div>
                  
                </form>
                </Modal>

            </div>

        )

    }

}

function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

function beforeUpload(file) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
}
