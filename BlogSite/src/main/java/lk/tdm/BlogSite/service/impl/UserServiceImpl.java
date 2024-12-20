package lk.tdm.BlogSite.service.impl;

import lk.tdm.BlogSite.dto.UserDTO;
import lk.tdm.BlogSite.entity.User;
import lk.tdm.BlogSite.repo.UserRepo;
import lk.tdm.BlogSite.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

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

        if (userRepo.save(user) != null) {}

    }

}
