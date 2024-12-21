package lk.tdm.BlogSite.service;

import lk.tdm.BlogSite.dto.UserDTO;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface UserService {
    String saveUser(UserDTO userDTO);

    String updateUser(UserDTO userDTO);

    UserDTO getUserById(int id);

    List<UserDTO> getAllUsers();

    String deleeUser(int id);

    UserDTO userLogin(String email, String password);
}
