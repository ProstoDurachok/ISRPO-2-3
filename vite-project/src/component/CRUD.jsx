import React from 'react';
import { getALL, createCustomer, updateCustomer, deleteCustomer } from '../api/books';

const Crud = () => {
    const [customers, setCustomers] = React.useState([]);
    const [newCustomer, setNewCustomer] = React.useState({ name: '', number: '' });
    const [editingCustomerId, setEditingCustomerId] = React.useState(null);
    const [editingCustomer, setEditingCustomer] = React.useState({ name: '', number: '' });
    const [searchId, setSearchId] = React.useState('');

    React.useEffect(() => {
        getALL().then((data) => {
            setCustomers(data);
        });
    }, []);

    const handleCreate = () => {
        createCustomer(newCustomer).then((createdCustomer) => {
            setCustomers([...customers, createdCustomer]);
            setNewCustomer({ name: '', number: '' }); 
        });
    };

    const handleEditClick = (customer) => {
        setEditingCustomerId(customer.id);
        setEditingCustomer({ name: customer.name, number: customer.number });
    };

    const handleUpdate = () => {
        updateCustomer(editingCustomerId, editingCustomer).then(() => {
            setCustomers(customers.map(c => (c.id === editingCustomerId ? { ...c, ...editingCustomer } : c)));
            setEditingCustomerId(null);
            setEditingCustomer({ name: '', number: '' }); 
        });
    };

    const handleDelete = (id) => {
        deleteCustomer(id).then(() => {
            setCustomers(customers.filter(customer => customer.id !== id));
        });
    };

    const filteredCustomers = customers.filter(customer => 
        searchId ? customer.id.toString() === searchId : true
    );

    return (
        <div>
            <input
                type="text"
                value={newCustomer.name}
                onChange={(e) => setNewCustomer({ ...newCustomer, name: e.target.value })}
                placeholder="Имя"
            />
            <input
                type="text"
                value={newCustomer.number}
                onChange={(e) => setNewCustomer({ ...newCustomer, number: e.target.value })}
                placeholder="Номер"
            />
            <button onClick={handleCreate}>Добавить</button>

            <div>
                <input
                    type="text"
                    value={searchId}
                    onChange={(e) => setSearchId(e.target.value)}
                    placeholder="Поиск по ID"
                />
            </div>

            <table>
                <tbody>
                    <tr>
                        <th>№</th>
                        <th>Имя</th>
                        <th>Номер</th>
                        <th>Действия</th>
                    </tr>
                    {filteredCustomers.map((customer) => (
                        <tr key={customer.id}>
                            <td>{customer.id}</td>
                            {editingCustomerId === customer.id ? (
                                <>
                                    <td>
                                        <input
                                            type="text"
                                            value={editingCustomer.name}
                                            onChange={(e) => setEditingCustomer({ ...editingCustomer, name: e.target.value })}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            value={editingCustomer.number}
                                            onChange={(e) => setEditingCustomer({ ...editingCustomer, number: e.target.value })}
                                        />
                                    </td>
                                    <td>
                                        <button onClick={handleUpdate}>Сохранить</button>
                                        <button onClick={() => setEditingCustomerId(null)}>Отмена</button>
                                    </td>
                                </>
                            ) : (
                                <>
                                    <td>{customer.name}</td>
                                    <td>{customer.number}</td>
                                    <td>
                                        <button onClick={() => handleEditClick(customer)}>Изменить</button>
                                        <button onClick={() => handleDelete(customer.id)}>Удалить</button>
                                    </td>
                                </>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Crud;
