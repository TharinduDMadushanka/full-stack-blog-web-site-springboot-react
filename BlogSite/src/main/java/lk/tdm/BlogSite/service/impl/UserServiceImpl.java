package lk.tdm.BlogSite.service.impl;

import lk.tdm.BlogSite.repo.UserRepo;
import lk.tdm.BlogSite.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepo userRepo;

}
