import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { connect } from 'react-redux';

import moment from 'moment';
import { Alert } from '@mui/material';

import Pagination from '../../components/pagination/pagination';
import { getUsers } from '../../redux/actions';
import { ReducerType } from '../../redux/reducers/rootReducer';
import { truncate } from '../../utils/functions/helpers';

const AdminUserSPage: React.FunctionComponent = (props: any) => {
  const { list, listIsLoading, listIsSuccess, listIsError, listMessage } = props.listState;
  const router = useRouter();
  const [addNewUser, setAddNewUser] = useState<boolean>(false);
  const [limit, setLimit] = useState<number>(10);
  const [page, setPage] = useState<number>(1);


 
  useEffect(() => {
      const filteredUrl = `/admin/users?page=${page}&limit=${limit}`
   props.getUsers(filteredUrl);
  }, [page, limit]);



  useEffect(() => {
    const redirectToSignUp = () => {
      if (addNewUser) {
        router.push('/admin/add-user');
      }
    };
    redirectToSignUp();
  }, [addNewUser]);

  if (addNewUser) {
    router.push('/admin/add-user');
  }

  const handleChange = (event: any, value: number) => {
    setPage(value);
  };

  return (
    <div>
      <Head>
        <title>Admin</title>
      </Head>
      <meta name="description" content="admin" />
      <div className="text-[18px] max-w-[1250px] mx-auto p-5 mt-11 min-h-[200px] ">
        <div className="flex flex-col max-h-[80vh]">
          {listIsError && (
            <Alert onClose={() => {}} variant="filled" severity="error">
              {listMessage}
            </Alert>
          )}

          <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block py-2 min-w-full sm:px-6 lg:px-8">
              <div className="overflow-hidden shadow-md sm:rounded-lg">
                <div className="flex items-center gap-6">
                  <button
                    onClick={() => setAddNewUser(true)}
                    className="bg-blue-500 text-white hover:bg-blue-400  font-bold py-2 px-4 rounded inline-flex items-center"
                  >
                    <span>Add New User</span>
                  </button>
                  <Pagination handleChange={handleChange} page={page} totalPages={list?.data?.totalPages}/>
                </div>
                <div />
                <table className="min-w-full">
                  <thead className="bg-gray-50 dark:bg-gray-700 font-bold">
                    <tr>
                      <th
                        scope="col"
                        className="py-3 px-6 text-xs  tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                      >
                        ID
                      </th>
                      <th
                        scope="col"
                        className="py-3 px-6 text-xs  tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                      >
                        FirstName
                      </th>

                      <th
                        scope="col"
                        className="py-3 px-6 text-xs tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                      >
                        lastName
                      </th>
                      <th
                        scope="col"
                        className="py-3 px-6 text-xs tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                      >
                        Email
                      </th>

                      <th
                        scope="col"
                        className="py-3 px-6 text-xs tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                      >
                        Gender
                      </th>

                      <th
                        scope="col"
                        className="py-3 px-6 text-xs  tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                      >
                        Date Of Birth
                      </th>
                      <th
                        scope="col"
                        className="py-3 px-6 text-xs tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                      >
                        Role
                      </th>

                      <th
                        scope="col"
                        className="py-3 px-6 text-xs tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                      >
                        joined Date
                      </th>

                      <th
                        scope="col"
                        className="py-3 px-6 text-xs tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                      >
                        Edidted Date
                      </th>
                      <th
                        scope="col"
                        className="py-3 px-6 text-xs tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                      >
                        Edit
                      </th>
                      <th
                        scope="col"
                        className="py-3 px-6 text-xs  tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                      >
                        Delete
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {list?.data &&
                      list.data?.users.map((user: any, index: number) => {
                        return (
                          <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                              {index + 1}
                            </td>

                            <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                              {user.firstName}
                            </td>
                            <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                              {user.lastName}
                            </td>
                            <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                              {truncate(user.email, 20)}
                            </td>
                            <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                              {user.gender}
                            </td>

                            <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                              {user.dateOfBirth}
                            </td>

                            <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                              {user.role}
                            </td>

                            <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                              {moment(user.createdAt).format('YYYY/MM/DD')}
                            </td>
                            <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                              {moment(user.updatedAt).format('YYYY/MM/DD')}
                            </td>
                            <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                              <a
                                href="#"
                                className="text-blue-600 hover:text-blue-900 dark:text-blue-500 dark:hover:underline"
                              >
                                Edit
                              </a>
                            </td>
                            <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                              <a
                                href="#"
                                className="text-blue-600 hover:text-blue-900 dark:text-blue-500 dark:hover:underline"
                              >
                                Delete
                              </a>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: ReducerType) => {
  return {
    listState: state.users
  };
};

const mapDispatchToProps = {
  getUsers
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminUserSPage);
