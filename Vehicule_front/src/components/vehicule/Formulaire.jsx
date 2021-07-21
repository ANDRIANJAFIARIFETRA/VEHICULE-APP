import React from "react";
import {base_url, upload, staticUrl} from "../../config/api.json";
import {getAllMarques, getAllCategories} from "../../services/vehiculeService"
import { Input , Select, Upload, message} from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'; 
// import base_url from '../../config/api.json'

const { Option } = Select;
const {  TextArea } = Input;

class Field extends React.Component{

    render(){

        const {name, value, onChange, label, type} = this.props
        return (
           <div className="container">
                <div style={{ marginBottom: 16 }}>
                {/* <label htmlFor={name}>{label}</label> */}
                {
                    type === 'text' ? 
                    <Input addonBefore={label} name={name} id={name} disabled={ name === 'code_vehicule' ? true : false } defaultValue={value} onChange={onChange} /> :
                    type === 'select' ? 
                   <>
                    <label >{label}</label>
                    <Select showSearch
                        style={{width:'100%'}}
                        placeholder={label}
                        optionFilterProp="children"
                        onChange={onChange}
                        value={value}
                        name={name} 
                        id={name}

                    >  {this.props.children}
                    </Select> 
                   </> : 
                    type === 'textarea' ? 
                    <>
                        <label htmlFor={name}>{label}</label> 
                        <TextArea rows={4} defaultValue={value} name={name} id={name} onChange={onChange} />
                    </>
                    :
                    null
                }

            </div>
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

function LogoMarque(props){

    if(props.etat === 'edition'){
        return(
            <img  src={`${base_url}${staticUrl}marque/${props.logo}`} alt="" style={{width:75, height:40, float:"right"}}  />
        )
    }else{
        return('')
    }

}

export class Formulaire extends React.Component {

    constructor(props){
        super(props)

        // console.log(props)
        this.state = {
            code_vehicule:props.data?.code_vehicule ,
            libelle_vehicule:props.status === 'edition' ? props.data?.libelle_vehicule : '',
            code_cat_fk:props.status === 'edition' ? props.data?.code_cat_fk : '',
            code_marque_fk:props.status === 'edition' ? props.data?.code_marque_fk : '',
            photo:props.status === 'edition' ? props.data?.photo : '', 
            desc_vehicule:props.status === 'edition' ? props.data?.desc_vehicule : '', 
            img_marque:props.status === 'edition' ? props.data?.img_marque : '', 
            loading: false,
            Marques: [],
            Categories: []
        }
        this.onInput = this.onInput.bind(this)
    }

    async onInput(e){

        // console.log(e.target.value);
        const name = e.target.name
        const value = e.target.value
        await this.setState({
            [name]:  value
        })  
        this.props.recupData({
            code_vehicule:this.state.code_vehicule,
            libelle_vehicule:this.state.libelle_vehicule,
            code_cat_fk:this.state.code_cat_fk,
            code_marque_fk:this.state.code_marque_fk,
            desc_vehicule:this.state.desc_vehicule,
            photo:this.state.photo
        })
    }

    setStateOnSelect = (type, value) => {

        if(type === 'marque'){
            this.setState({code_marque_fk:value})
        }else if(type === 'categorie'){
            this.setState({code_cat_fk:value})
        }else{
            this.setState({photo:value})
        }

    }

    async  onSelect(type, value){
    //   console.log(type, value);
        await this.setStateOnSelect(type, value)
        
        this.props.recupData({
            code_vehicule:this.state.code_vehicule,
            libelle_vehicule:this.state.libelle_vehicule,
            code_cat_fk:this.state.code_cat_fk,
            code_marque_fk:this.state.code_marque_fk,
            desc_vehicule:this.state.desc_vehicule,
            photo:this.state.photo
        })


    }
    componentDidMount(){

        if(this.props.status === 'edition'){
            this.setState({
                imageUrl:this.state.photo ? `${base_url}${staticUrl}voiture/${this.state.photo}` : null
            })
        }
        getAllMarques().then(marque => {
            this.setState({
                Marques:marque.data
            })
        })

        getAllCategories().then(cat => {
            this.setState({
                Categories:cat.data
            })
        })

    }
  
    async handleChange (info) {

        await this.setState({
            photo:info.file.name
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
        this.props.recupData({
            code_vehicule:this.state.code_vehicule,
            libelle_vehicule:this.state.libelle_vehicule,
            code_cat_fk:this.state.code_cat_fk,
            code_marque_fk:this.state.code_marque_fk,
            desc_vehicule:this.state.desc_vehicule,
            photo:this.state.photo
        })

    };

    
    render(){
        const { loading, imageUrl } = this.state;
        const uploadButton = (
        <div>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
        );
        
        return(
           <div>
                <form >
                    <h4 style={{display:'inline-block'}} >{this.props.title}</h4> 

                        <LogoMarque logo={this.state.img_marque} etat={this.props.status}/>        
        
                    <hr />
                    <div className="row">
                        <div className="col-8">
                   
                            <Field label="Code véhicule :" type="text" name="code_vehicule" value={this.state.code_vehicule} onChange={this.onInput}></Field>
                            <Field label="Nom véhicule :" type="text" name="libelle_vehicule" value={this.state.libelle_vehicule} onChange={this.onInput}></Field>
                            <div className="form-row">
                                <div className="form-group col-6">
                                   
                                    <Field label="Catégorie :" type="select" id="code_cat_fk" name="code_cat_fk" value={this.state.code_cat_fk} onChange={this.onSelect.bind(this,'categorie')}>
                                        <Option value=""></Option>
                                        {  this.state.Categories.map(cat => {
                                            return  <Option key={cat.code_cat} value={cat.code_cat}> {cat.libelle_cat} </Option>
                                            })
                                        }
                                    </Field>
                                </div>
                                <div className="form-group col-6">
                                    <Field label="Marque :" type="select" id="code_marque_fk" name="code_marque_fk" value={this.state.code_marque_fk} onChange={this.onSelect.bind(this, 'marque')}>
                                        <Option value=""></Option>
                                        { this.state.Marques.map(marque => {
                                                return  <Option key={marque.code_marque} value={marque.code_marque}> {marque.libelle_marque} </Option>
                                            })
                                        }
                                    </Field>
                                </div>
                            </div>
                            <Field label="Description :" type="textarea" name="desc_vehicule" value={this.state.desc_vehicule} onChange={this.onInput} ></Field>
                        </div>
                        <div className="col-4">

                        <div className="border-card-image">
                            <label > Choisir une Image </label>
                            <Upload
                                
                                name="image"
                                listType="picture-card"
                                className="avatar-uploader"
                                showUploadList={false}
                                action={`${base_url}${upload}image`}
                                beforeUpload={beforeUpload}
                                onChange={this.handleChange.bind(this)}
                            >
                                {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                            </Upload>
                        </div>
                       
                        </div>
                    </div>
                </form>
                {/* {JSON.stringify(this.state)} */}
           </div>
        
        );
        
    }

}


export default Formulaire