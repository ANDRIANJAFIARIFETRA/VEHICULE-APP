import React from 'react'
import {base_url, staticUrl} from "../../config/api.json";
import {getAllVehicule, getAllVehiculeId, getAllMarques,vehiculeFilter, getAllCategories, searchFilter} from "../../services/vehiculeService"
import {Input, Modal , Tooltip,  Menu, Layout, Empty} from 'antd';
import { AppstoreOutlined,HeartOutlined} from '@ant-design/icons';

const { Sider, Content } = Layout;
const { SubMenu } = Menu;
const rootSubmenuKeys = ['sub1', 'sub2', 'sub4'];

function EmptyData(props) {

    if(props.data.length === 0){
        return(<Empty/>)
    }else{
        return('')
    }

}

function ModalContent(props){

    if(props.etat === 'image'){
        return(
            <div > 
                <img style={{width:'100%'}}  src={`${base_url}${staticUrl}voiture/${props.vehicule?.photo}`} alt=""/>
            </div> 
                  
        )
    }else if(props.etat === 'desc'){

        return(
            <div className="row">
                <div className="col-12 col-sm-6">
                    <b>Catégorie :</b>
                    <div style={{marginLeft:'20px', marginBottom:'20px'}}> {props.vehicule?.libelle_cat} </div> 
                    <b>Marque : {props.vehicule?.libelle_marque} </b>
                    <div style={{marginLeft:'20px', margin:'20px'}}> 
                        <img  src={`${base_url}${staticUrl}marque/${props.vehicule?.img_marque}`} alt=""  style={{width:70, height:35}}  />
                        
                    </div> 
                    <b>Description :</b> 
                    <div style={{marginLeft:'20px', marginBottom:'20px'}}> {props.vehicule?.desc_vehicule} </div> 
                
                </div>
                <div className="col-12 col-sm-6">
                    <div className="border-card-image">
                    <input style={{width:'100%'}} type="image" src={`${base_url}${staticUrl}voiture/${props.vehicule?.photo}`} alt="Card image cap"/>
    
                    </div>
                </div>
            </div>  
        )
    }


}

export class Home extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            isModalVisible:false,
            ModalType:null,
            Vehicules:[],
            vehicule:null,
            openKeys:['sub1'],
            Marques:[],
            Categories:[]
        }
    }

    componentDidMount(){

        this.getListVehicule();

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
 
    getListVehicule = () =>{
         
        getAllVehicule().then(vhcl => {
             
             this.setState({
                 Vehicules:vhcl.data
             })
 
         })
    }

    showModal = async (code,type, info) => {
        // console.log(code, type)
        await getAllVehiculeId(code).then(res => {

            if(res.status){
                this.setState({
                    ModalType:type,
                    vehicule:res.data[0]
                })
            }

        })
        // console.log(this.state.vehicule)
        this.setState({
            
            isModalVisible:true
        })
    };
  
    handleCancel = () => {
        this.setState({
            isModalVisible:false
        })
    };

    onFilter(type, cat){

        vehiculeFilter({
            key:type, value:cat
        }).then(res => {
        
            if(res.status){
                this.setState({
                    Vehicules:res.data
                })
            }else{
                this.setState({
                    Vehicules:[]
                })
            }

        })

    }

    onSearch = value => {
        
        searchFilter({key:value}).then(res => {
            if(res.status){
                this.setState({
                    Vehicules:res.data
                })
            }else{
                this.setState({
                    Vehicules:[]
                })
            }
        })

    };
  
	render(){

        const { Search } = Input;
        const onOpenChange = keys => {

            const latestOpenKey = keys.find(key => this.state.openKeys.indexOf(key) === -1);
            if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
                this.setState({
                    openKeys:keys
                })
            
            } else {
                this.setState({
                    openKeys:latestOpenKey ? [latestOpenKey] : []
                })
            
            }
        };

        // console.log(this.state);
		return(
            <div className="container">
                <div style={{marginTop:'20px'}}>
                    <h3> Bienvenu dans ce mini-blog </h3>
                    <p> Classement des véhicules par marque et catégorie </p>
                </div>
                <hr />
                <Layout>
                    <Sider style={{backgroundColor:'#fff', margin:'7px'}}>
                        <Search placeholder="Recherche ..." enterButton onSearch={this.onSearch}/>
                        <hr />
                        <span style={{ margin:'10px'}}><b>Filtre</b></span>
                        <Menu  mode="inline" openKeys={this.state.openKeys} onOpenChange={onOpenChange}>
                            <SubMenu key="sub1" icon={<HeartOutlined />} title="Marques">
                                <Menu.Item key="toutMarque" onClick={this.getListVehicule}>Tout</Menu.Item>
                                {
                                    this.state.Marques.map( marque => {
                                        return(
                                            <Menu.Item key={marque.code_marque} onClick={this.onFilter.bind(this, 'code_marque_fk', marque.code_marque)}>{marque.libelle_marque}</Menu.Item>
                                        )
                                    })
                                }

                            </SubMenu>
                            <SubMenu key="sub2" icon={<AppstoreOutlined />} title="Catégories">
                                <Menu.Item key="toutCategorie"  onClick={this.getListVehicule}>Tout</Menu.Item>
                                {
                                    this.state.Categories.map( cat => {
                                        return(
                                            <Menu.Item key={cat.code_cat} onClick={this.onFilter.bind(this, 'code_cat_fk', cat.code_cat)} >{cat.libelle_cat}</Menu.Item>
                                        )
                                    })
                                }
                            </SubMenu>
                        </Menu>
                    </Sider>
                    <Content style={{backgroundColor:'#fff'}}>
                        <EmptyData data={this.state.Vehicules}/>
                        <div className="row" >
                            {
                                this.state.Vehicules.map(vhcl => {

                                return(
                                    
                                    <div className="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3" key={vhcl.code_vehicule + 'col'}>
                                        <div className="card " key={vhcl.code_vehicule + 'card'}>
                                            <div className="div-img">
                                                <input type="image" className="card-img-top" onClick={this.showModal.bind(this, vhcl.code_vehicule, 'image')} src={`${base_url}${staticUrl}voiture/${vhcl.photo}`} alt="Card image cap" key={vhcl.code_vehicule + 'img'}/>
                                            </div>
                                            <div className="card-body" key={vhcl.code_vehicule + 'body'}>
                                                <span className="card-title" key={vhcl.code_vehicule + 'title'} style={{display:'inline-block'}}>{vhcl.libelle_vehicule}</span>
                                                <img  src={`${base_url}${staticUrl}marque/${vhcl.img_marque}`} alt="" style={{width:35, height:20, float:"right"}}  />
                                                <hr />
                                                <p className="card-text" key={vhcl.code_vehicule + 'desc'}>{vhcl.desc_vehicule}</p>
                                            </div>
                                            <div className="card-footer" key={vhcl.code_vehicule + 'foot'}>
                                                <small className="text-muted">Catégorie : {vhcl.libelle_cat}</small>
                                                <Tooltip placement="topRight" title="Voir le détails">
                                                    
                                                        <svg onClick={this.showModal.bind(this, vhcl.code_vehicule, 'desc')} width="17px" style={{float:'right'}}  xmlns="http://www.w3.org/2000/svg" className="detail h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                        </svg>
                                                    
                                                </Tooltip>
                                            </div>
                                        </div>
                                    </div>
                                    

                                )
                                })
                            }
                        </div>
                       
                    </Content>
                </Layout>

                <Modal  title={this.state.vehicule?.libelle_vehicule} 
                        visible={this.state.isModalVisible} 
                        onCancel={this.handleCancel}
                        width={this.state.ModalType === 'desc' ? 700 : 800}
                        footer={  
                            this.state.ModalType ==='desc' ? [
                                <button key="back"  className="btn btn-sm btn-secondary"style={{marginRight:'7px'}}  onClick={this.handleCancel}>
                                    Fermer
                                </button>
                            ] : null
                          }>

                   <ModalContent vehicule={this.state.vehicule} etat={this.state.ModalType} />       
                   
                </Modal>

            </div>
        )
	}
}

