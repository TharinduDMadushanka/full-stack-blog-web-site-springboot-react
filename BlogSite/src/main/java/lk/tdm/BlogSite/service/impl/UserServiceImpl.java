package lk.tdm.BlogSite.service.impl;

import lk.tdm.BlogSite.controller.UserController;
import lk.tdm.BlogSite.dto.UserDTO;
import lk.tdm.BlogSite.entity.User;
import lk.tdm.BlogSite.exception.BadRequestException;
import lk.tdm.BlogSite.repo.UserRepo;
import lk.tdm.BlogSite.service.UserService;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    private static final Logger logger = LogManager.getLogger(UserServiceImpl.class);

    @Autowired
    private UserRepo userRepo;

    @Override
    public String saveUser(UserDTO userDTO) {

        User user = new User(
                userDTO.getUserId(),
                userDTO.getUserName(),
                userDTO.getPassword(),
                userDTO.getEmail(),
                userDTO.getPhone()
        );

        if (!userRepo.existsById(userDTO.getUserId())) {
            userRepo.save(user);
            logger.info("User " + userDTO.getUserId() + " saved successfully!");
            return "User saved successfully!";
        }else {
            logger.warn("User " + userDTO.getUserId() + " already exists!");
            throw new BadRequestException("User already exists!");
        }
    }

    @Override
    public String updateUser(UserDTO userDTO) {

        boolean existsUser = userRepo.existsById(userDTO.getUserId());

        if (existsUser) {
            User user = userRepo.getReferenceById(userDTO.getUserId());
            user.setUserName(userDTO.getUserName());
            user.setPassword(userDTO.getPassword());
            user.setEmail(userDTO.getEmail());
            user.setPhone(userDTO.getPhone());

            userRepo.save(user);
            logger.info("User " + userDTO.getUserId() + " updated successfully!");
            return "User updated successfully!";
        }else {
            logger.warn("User " + userDTO.getUserId() + " does not exists!");
            throw new BadRequestException("User does not exists!");
        }

    }

    @Override
    public UserDTO getUserById(int id) {

        Optional<User> userOptional = userRepo.findById(id);

        if (userOptional.isPresent()) {
            User user = userOptional.get();
            logger.info("User " + user.getUserId() + " get successfully!");
            return new UserDTO(
                    user.getUserId(),
                    user.getUserName(),
                    user.getPassword(),
                    user.getEmail(),
                    user.getPhone()
            );
        }else {
            logger.warn("User " + id + " does not exists!");
            throw new BadRequestException("User does not exists!");
        }
    }

    @Override
    public List<UserDTO> getAllUsers() {

        List<User> userList = userRepo.findAll();

        List<UserDTO> userDTOList = new ArrayList<>();

        if (!userList.isEmpty()) {
            for (User user : userList) {
                userDTOList.add(new UserDTO(
                        user.getUserId(),
                        user.getUserName(),
                        user.getPassword(),
                        user.getEmail(),
                        user.getPhone()
                ));
            }
            logger.info("All Users found!");
            return userDTOList;
        }else {
            logger.warn("All Users not found!");
            throw new BadRequestException("All Users not found!");
        }
    }

    @Override
    public String deleeUser(int id) {

        if (!userRepo.existsById(id)) {
            logger.warn("User " + id + " does not exists!");
            throw new BadRequestException("User does not exists!");
        }else {
            userRepo.deleteById(id);
            logger.info("User " + id + " deleted successfully!");
            return "User deleted successfully!";
        }

    }

    @Override
    public UserDTO userLogin(String email, String password) {

        List<User> users = userRepo.getUserByEmailAndAndPassword(email,password);

        if (!users.isEmpty()) {
            User user = users.get(0);
            logger.info("User " + user.getUserId() + " login successfully!");
            return new UserDTO(
                    user.getUserId(),
                    user.getUserName(),
                    user.getPassword(),
                    user.getEmail(),
                    user.getPhone()
            );
        }else {
            logger.warn("User " + email + " does not exists!");
            throw new BadRequestException("User does not exists!");
        }
    }

}
