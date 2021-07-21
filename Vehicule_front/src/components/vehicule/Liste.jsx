import * as React from 'react'
import {getAllMarques, getAllCategories, getAllVehicule, DeleteVehicule, getAllVehiculeId, UpdateVehicule, InsertVehicule, getLastVehicule, searchFilter, vehiculeFilter} from "../../services/vehiculeService"
import { Modal , Button , Tooltip, Table } from 'antd';
import {base_url, staticUrl} from "../../config/api.json";
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Menu, Input} from 'antd';
import { HeartOutlined, AppstoreOutlined } from '@ant-design/icons';
import {Formulaire}  from '../../components/vehicule/Formulaire';
const { confirm } = Modal;

const { SubMenu } = Menu;

function Edit(data){

    const [visible, setVisible] = React.useState(false);
    const [confirmLoading, setConfirmLoading] = React.useState(false);
    const [vehicule, setVehicule] = React.useState({}); 

    const showModal = async () => {
        // console.log(data.code)
       
        await getAllVehiculeId(data.code).then(res => {
            
            if(res.status){
                setVehicule(res.data[0]);
            }else{
                setVehicule(null)
            }

        })
        setVisible(true);
        // console.log(vehicule)
       
    };
    
    const handleOk = () => {

        setConfirmLoading(true);
        UpdateVehicule(data.code, vehicule).then(res => {
            // console.log(res);
            if(res.status){
                Modal.success({
                    content:res.message,
                });
                data.refreshList();
                setVisible(false);
                setConfirmLoading(false);
            }else{
                Modal.error({
                    content: res.message,
                });
            }

        })
    };

    const getChildData = (callback) => {
        // console.log(callback)
        setVehicule(callback)
    }



    const handleCancel = () => {
        // console.log('Clicked cancel button');
        setVisible(false);
    };

    return(
        <>
            <span data-toggle="modal" onClick={showModal} data-target="#exampleModal" className="svg-edit-color">
                <svg  width="20px" xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
            </span> 
            <Modal
                title="Edition véhicule"
                visible={visible}
                confirmLoading={confirmLoading}
                width={800}
                onCancel={handleCancel}
                footer={[
                    <button key="back"  className="btn btn-sm btn-secondary"style={{marginRight:'7px'}}  onClick={handleCancel}>
                        Anuler
                    </button> ,
                    <button key="save" type="primary" className="btn btn-sm btn-success" onClick={handleOk}>
                      Enregistrer
                    </button>
                ]}
            >
                <Formulaire 
                    title={vehicule?.libelle_vehicule} 
                    data={vehicule} 
                    status="edition"
                    recupData={getChildData}
                />
            </Modal>
        </>
    )

}

function Add(data){

    const [visible, setVisible] = React.useState(false);
    const [confirmLoading, setConfirmLoading] = React.useState(false);
    const [vehicule, setVehicule] = React.useState({}); 

    const showModal = async () => {

        let NewCode = null
        await getLastVehicule().then(res => {
            // console.log(res);
            if(res.status){

                const lastCode = res.data.code_vehicule //VHCL-006
                const NewNumber = parseInt(lastCode.split('-')[1]) + 1
                const NewNumberZerrofile = NewNumber < 10 ? '00' + NewNumber : NewNumber < 100 ? '0' + NewNumber: NewNumber < 1000 ? NewNumber : null
                NewCode = `VHCL-${(NewNumberZerrofile).toString()}`; 
               
            }
             
        })    

        setVehicule({
            code_vehicule:NewCode,
            libelle_vehicule:'',
            code_cat_fk:'',
            code_marque_fk:'',
            photo:null
        })
        setVisible(true);  

    };
    
    const handleOk = () => {

        setConfirmLoading(true);
        console.log(vehicule);
            InsertVehicule(vehicule).then(res => {
                // console.log(res);
                if(res.status){
                    Modal.success({
                        content:res.message,
                    });
                    data.refreshList();
                    setVehicule({
                        code_vehicule:'',
                        libelle_vehicule:'',
                        code_cat_fk:'',
                        code_marque_fk:'',
                        photo:null
                    })
                    setVisible(false);
                    setConfirmLoading(false);
                }else{
                    Modal.error({
                        content: res.message,
                    });
                }

        })
    };

    const getChildData = (callback) => {
        setVehicule(callback)
    }



    const handleCancel = () => {
        console.log('Clicked cancel button');
        setVisible(false);
    };

 

    return(
        <>
            <Button type="primary" onClick={showModal} style={{display:'inline-block', float:'right'}}> 
                Ajouter  &nbsp;
                <svg width="20px" xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            </Button>
            
            <Modal
                title="Ajout véhicule"
                visible={visible}
                confirmLoading={confirmLoading}
                width={800}
                onCancel={handleCancel}
                footer={[
                    <button key="back"  className="btn btn-sm btn-secondary"style={{marginRight:'7px'}}  onClick={handleCancel}>
                        Anuler
                    </button> ,
                    <button key="save" type="primary" className="btn btn-sm btn-success" onClick={handleOk}>
                      Enregistrer
                    </button>
                ]}
            >
                <Formulaire 
                    status="ajout"
                    recupData={getChildData}
                    data={vehicule}
                />
            </Modal>
        </>
    )

}

export class Liste extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            Vehicules:[],
            Marques:[],
            Categories:[],
            pagination: {
                current: 1,
                pageSize: 4,
            },
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

    getListVehicule = () => {

        const { pagination } = this.state;

        getAllVehicule().then(vhcl => {
          
            this.fetchListVehicule({ pagination }, vhcl.data);

        })

    }

    handleTableChange = (pagination, filters, sorter) => {

        this.fetchListVehicule({
          sortField: sorter.field,
          sortOrder: sorter.order,
          pagination,
          ...filters,
        }, this.state.Vehicules);
    };


    showConfirmDelete(code, info) {

        const refresh = () => {
            this.getListVehicule();
         }

        confirm({
          title: 'Voulez-vous vraiement suprimer ce véhicule ?',
          icon: <ExclamationCircleOutlined />,
          onOk() {
              
            DeleteVehicule(code).then(res => {
                if(res.status){
                    Modal.success({
                        content: res.message,
                    });
                   refresh();
                }else{
                    Modal.error({
                        content: res.message,
                    });
                }
            })
          },
          onCancel() {
            console.log('Cancel');
          },
        });
    }

    onSelectFilter = e => {
        // console.log('click ', e);
        this.setState({ current: e.key });
    };

    onFilter = (type, cat) => {
        const { pagination } = this.state;

        vehiculeFilter({
            key:type, value:cat
        }).then(res => {
        
            if(res.status){
                this.fetchListVehicule({ pagination }, res.data);
            }else{
                this.fetchListVehicule({ pagination }, []);
            }
    
        })

    }

    onSearch = value => {
        const { pagination } = this.state;
        searchFilter({key:value}).then(res => {
            if(res.status){
                this.fetchListVehicule({ pagination }, res.data);
            }else{
                this.fetchListVehicule({ pagination }, []);
            }
        })

    };

    fetchListVehicule = (params = {}, data) => {
    
        this.setState({
            Vehicules: data,
            pagination: {
                ...params.pagination,
                total: data.length
                
            },
        });

    };

    render(){
        const { current, pagination } = this.state;
        const { Search } = Input;
        const columns = [
            {
              title: 'Code',
              dataIndex: 'code_vehicule',
            },
            {
              title: 'Nom Véhicules',
              dataIndex: 'libelle_vehicule',
            },
            {
              title: 'Marques',
              dataIndex: 'img_marque',
            },
            {
                title: 'Catégories',
                dataIndex: 'libelle_cat',
            },
            {
                title: 'Action',
                dataIndex: 'action',
            },
        ];
          
        const data = [];
        for (let i = 0; i < this.state.Vehicules.length; i++) {

            let vhcl = this.state.Vehicules[i]
            data.push({

                key: vhcl.code_vehicule,
                code_vehicule:  [ 
                    <svg  key={vhcl.code_vehicule + 'icon'} width="15px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#000000">
                        <path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zm-.5 1.5l1.96 2.5H17V9.5h2.5zM6 18c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm2.22-3c-.55-.61-1.33-1-2.22-1s-1.67.39-2.22 1H3V6h12v9H8.22zM18 18c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z"/>
                    </svg>,
                     vhcl.code_vehicule
                ],
                libelle_vehicule: vhcl.libelle_vehicule,
                img_marque:[
                    <div key={vhcl.code_vehicule + 'div'}>
                        <input type="image"  src={`${base_url}${staticUrl}marque/${vhcl.img_marque}`} alt="" key={vhcl.code_vehicule + 'img'} style={{width:70, height:35}}  />
                    </div>
                ],
                libelle_cat: vhcl.libelle_cat,
                action:[
                    <Tooltip placement="topRight" title="Editer" key={vhcl.code_vehicule + 'ttp1'}>
                        <Edit key={vhcl.code_vehicule + 'edit'} code={vhcl.code_vehicule} refreshList={this.getListVehicule.bind(this)}/>
                    </Tooltip>,
                    <Tooltip placement="topRight" title="Suprimer" key={vhcl.code_vehicule + 'ttp2'}>
                        <span key={vhcl.code_vehicule + 'delete'} className="svg-delete-color"  onClick={this.showConfirmDelete.bind(this, vhcl.code_vehicule)} >
                            <svg key={vhcl.code_vehicule + 'svg'} width="20px" xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path key={vhcl.code_vehicule + 'path'} strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                        </span>
                    </Tooltip>
                ]

            });
        }
         
        return(

            <div className="main-content">
                <Menu  onClick={this.onSelectFilter} selectedKeys={[current]} mode="horizontal">

                    <Menu.Item disabled key="title">
                         <h4 style={{display:'inline-block'}} >Liste des Véhicules</h4>
                    </Menu.Item>
                    <SubMenu key="SubMenu1" icon={<HeartOutlined />} title="Marques">
                        <Menu.Item key="toutMarque" onClick={this.getListVehicule}>Tout</Menu.Item>
                        {
                            this.state.Marques?.map( marque => {
                                return(
                                    <Menu.Item key={marque.code_marque} onClick={this.onFilter.bind(this, 'code_marque_fk', marque.code_marque)}>{marque.libelle_marque}</Menu.Item>
                                )
                            })
                        }
                    </SubMenu>
                    <SubMenu key="SubMenu2" icon={<AppstoreOutlined />} title="Catégories">
                       
                        <Menu.Item key="toutCategorie"  onClick={this.getListVehicule}>Tout</Menu.Item>
                        {
                            this.state.Categories?.map( cat => {
                                return(
                                    <Menu.Item key={cat.code_cat} onClick={this.onFilter.bind(this, 'code_cat_fk', cat.code_cat)} >{cat.libelle_cat}</Menu.Item>
                                )
                            })
                        }
                    
                    </SubMenu>
                    <Menu.Item key="search" disabled>
                        <Search placeholder="Recherche ..." enterButton onSearch={this.onSearch}/>
                    </Menu.Item>
                    <Menu.Item key="alipay" disabled>
                        <Add refreshList={this.getListVehicule.bind(this)}/>
                    </Menu.Item>

                </Menu> <br />

                <Table columns={columns} dataSource={data} pagination={pagination} onChange={this.handleTableChange}/>
                 
            </div>
        )

    }

}