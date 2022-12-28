import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Alert } from '@mui/material';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { v4 as uuidv4 } from 'uuid';

import { ModalComponent as Modal, PaginationComponent as Pagination } from '@/components';
import { deleteUser, getUsers, ReducerType, restDeleteUser } from '@/global-states';
import { _usersPrototypeReducerState as ReducerState, UserType } from '@/types';
import { truncate } from '@/utils';

// props from connect mapDispatchToProps
interface MapDispatchProps {
  getUsers: (filteredUrl: string) => void;
  restDeleteUser: () => void;
  deleteUser: (userId: string) => void;
}

// props from connect mapStateToProps
interface MapStateProps {
  listState: ReducerState;
}

type PropsType = MapDispatchProps & MapStateProps;

export function AdminUserSTablePage({
  getUsers,
  restDeleteUser,
  deleteUser,
  listState,
}: PropsType) {
  const {
    users,
    // list,
    // totalDocs,
    lastPage,
    listIsLoading,
    // listIsSuccess,
    listIsError,
    listMessage,
    deleteUserIsPending,
    deleteUserIsSuccess,
    deleteUserIsError,
    deleteUserMessage,
  } = listState;
  const router = useRouter();
  const [addNewUser, setAddNewUser] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [open, setOpen] = useState<boolean>(false);
  const [id, setId] = useState<string | undefined>();
  const [showAlert, setShowAlert] = useState<boolean>(false);

  useEffect(() => {
    const filteredUrl = `/admin/users?page=${page}&limit=10`;
    getUsers(filteredUrl);
  }, [page, deleteUserIsSuccess]);

  useEffect(() => {
    if (deleteUserIsSuccess || deleteUserIsError) {
      setId(() => undefined);
      setShowAlert(() => true);
      setOpen(() => false);

      const timer = setTimeout(() => {
        setShowAlert(() => false);
        restDeleteUser();
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [deleteUserIsSuccess, deleteUserIsError]);

  useEffect(() => {
    const redirectToSignUp = () => {
      if (addNewUser) {
        router.push('/admin/users/add-user');
      }
    };
    redirectToSignUp();
  }, [addNewUser]);

  if (addNewUser) {
    router.push('/admin/users/add-user');
  }

  const handleChange = (_event: any, value: number) => {
    setPage(value);
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleDelete = () => {
    if (id) {
      deleteUser(id);
    }
  };

  return (
    <div>
      <div className="mx-auto mt-11 min-h-[200px] max-w-[1250px] p-5 text-[18px]  ">
        <div className="flex max-h-[80vh] flex-col">
          <div>
            {!users.length && (
              <div className="easy-in-out  container m-12  w-full transform rounded bg-white font-bold  shadow-lg  duration-200">
                {listIsLoading && (
                  <div className=" flex items-center justify-center ">
                    <CircularProgress color="secondary" />
                  </div>
                )}
                {!listIsError && !listIsLoading && <p className="p-4"> No user found</p>}
                {listIsError && (
                  <Alert variant="filled" severity="error">
                    {listMessage}
                  </Alert>
                )}
              </div>
            )}
          </div>

          {users.length > 0 && (
            <>
              {showAlert && (
                <Alert
                  variant="filled"
                  severity={deleteUserIsError ? 'error' : 'success'}
                  onClose={() => setShowAlert(false)}
                >
                  {deleteUserMessage}
                </Alert>
              )}

              <Modal
                handleClose={handleClose}
                open={open}
                handleSubmit={handleDelete}
                handlePending={deleteUserIsPending}
                message="user"
              />

              <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                  <div className="overflow-hidden shadow-md sm:rounded-lg">
                    <div className="flex items-center gap-6">
                      <button
                        type="button"
                        onClick={() => setAddNewUser(true)}
                        className="inline-flex items-center rounded  bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-400"
                      >
                        <span>Add New User</span>
                      </button>
                      {lastPage > 0 && (
                        <Pagination handleChange={handleChange} page={page} totalPages={lastPage} />
                      )}
                    </div>
                    <div />
                    <table className="min-w-full">
                      <thead className="bg-gray-50 font-bold dark:bg-gray-700">
                        <tr>
                          <th
                            scope="col"
                            className="py-3 px-6 text-left  text-xs uppercase tracking-wider text-gray-700 dark:text-gray-400"
                          >
                            ID
                          </th>
                          <th
                            scope="col"
                            className="py-3 px-6 text-left  text-xs uppercase tracking-wider text-gray-700 dark:text-gray-400"
                          >
                            FirstName
                          </th>

                          <th
                            scope="col"
                            className="py-3 px-6 text-left text-xs uppercase tracking-wider text-gray-700 dark:text-gray-400"
                          >
                            lastName
                          </th>
                          <th
                            scope="col"
                            className="py-3 px-6 text-left text-xs uppercase tracking-wider text-gray-700 dark:text-gray-400"
                          >
                            Email
                          </th>

                          <th
                            scope="col"
                            className="py-3 px-6 text-left text-xs uppercase tracking-wider text-gray-700 dark:text-gray-400"
                          >
                            Gender
                          </th>

                          <th
                            scope="col"
                            className="py-3 px-6 text-left  text-xs uppercase tracking-wider text-gray-700 dark:text-gray-400"
                          >
                            Date Of Birth
                          </th>
                          <th
                            scope="col"
                            className="py-3 px-6 text-left text-xs uppercase tracking-wider text-gray-700 dark:text-gray-400"
                          >
                            Role
                          </th>
                          <th
                            scope="col"
                            className="py-3 px-6 text-left text-xs uppercase tracking-wider text-gray-700 dark:text-gray-400"
                          >
                            Edit
                          </th>
                          <th
                            scope="col"
                            className="py-3 px-6 text-left  text-xs uppercase tracking-wider text-gray-700 dark:text-gray-400"
                          >
                            Delete
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {users &&
                          users.map((user: UserType, index: number) => (
                            <tr
                              key={uuidv4()}
                              className="border-b bg-white dark:border-gray-700 dark:bg-gray-800"
                            >
                              <td className="whitespace-nowrap py-4 px-6 text-sm font-medium text-gray-900 dark:text-white">
                                {index + 1}
                              </td>

                              <td className="whitespace-nowrap py-4 px-6 text-sm font-medium text-gray-900 dark:text-white">
                                {user.name}
                              </td>
                              <td className="whitespace-nowrap py-4 px-6 text-sm text-gray-500 dark:text-gray-400">
                                {user.surname}
                              </td>
                              <td className="whitespace-nowrap py-4 px-6 text-sm text-gray-500 dark:text-gray-400">
                                {truncate(user.email, 20)}
                              </td>
                              <td className="whitespace-nowrap py-4 px-6 text-sm text-gray-500 dark:text-gray-400">
                                {user.gender}
                              </td>

                              <td className="whitespace-nowrap py-4 px-6 text-sm text-gray-500 dark:text-gray-400">
                                {user.dateOfBirth}
                              </td>

                              <td className="whitespace-nowrap py-4 px-6 text-sm text-gray-500 dark:text-gray-400">
                                {user.role}
                              </td>

                              <td className="whitespace-nowrap py-4 px-6 text-sm text-gray-500 dark:text-gray-400">
                                <Link href={`/admin/users/${user._id}`}>
                                  <Button variant="outlined" startIcon={<EditIcon />}>
                                    Edit
                                  </Button>
                                </Link>
                              </td>

                              <td className="whitespace-nowrap py-4 px-6 text-sm text-gray-500 dark:text-gray-400">
                                <Button
                                  color="warning"
                                  variant="outlined"
                                  startIcon={<DeleteIcon />}
                                  onClick={() => {
                                    setId(() => user._id);
                                    handleOpen();
                                  }}
                                >
                                  Delete
                                </Button>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state: ReducerType) => ({
  listState: state.users,
});

const mapDispatchToProps = {
  getUsers,
  restDeleteUser,
  deleteUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminUserSTablePage);
