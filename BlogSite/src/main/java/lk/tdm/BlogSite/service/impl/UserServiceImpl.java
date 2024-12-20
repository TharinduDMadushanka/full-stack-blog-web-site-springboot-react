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

}
